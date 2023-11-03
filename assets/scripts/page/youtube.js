
class youtubepage {


    constructor(){
        this.target = document.getElementById('youtube-container');
        this.script_load();
    }


    script_load() {
        let mainjs = document.getElementById( 'base-jsx' );
        let gensrc = document.createElement( 'script' );
        gensrc.src = "https://apis.google.com/js/api.js";
        gensrc.setAttribute( 'defer', '');
        mainjs.after( gensrc );

        gensrc.onload = ()=> {
            this.client_load();
        }
    }

    client_load() {
        gapi.load("client", ()=> {
            gapi.client.setApiKey(this.target.dataset.unique);
            gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
            .then(()=> {
                this.load_datums();
            },
            (err) => {
                console.error("Error loading GAPI client for API", err);
            })
        });
    }


    load_datums() {

        let data = {
            "part"     : "snippet",
            "channelId": "UCZj6SQNzUfWIbtmbnpJNfig",
            "type"     : "video"
        }

        gapi.client.youtube.search.list(data)
        .then( (response) => {
            // Handle the results here (response.result has the parsed body).
            // console.table("Response", response);
            this.render_list(response);
        },
        (err) => {
            console.error("Execute error", err);
        });
    }


    render_list( datums ) {
        
        datums.result.items.forEach(element => {
            
            console.log(element)

            let meta_vidid = element.id.videoId ;
            let meta_title = element.snippet.title ;
            let thumb_base = element.snippet.thumbnails.default.url ;
            let thumb_high = element.snippet.thumbnails.high.url ;
            let thumb_meds = element.snippet.thumbnails.medium.url ;

            let player = document.createElement('div');
            let titles = document.createElement('h2');
            let embeds = document.createElement('iframe');

            embeds.src = "https://www.youtube.com/embed/"+meta_vidid;
            embeds.setAttribute('title', meta_title )

            titles.innerText = meta_title;

            this.target.appendChild(player);
            player.appendChild(embeds);
            player.appendChild(titles);

        });
    }

    
}


new youtubepage;