// // this code will be executed after page load

const intervalId = setInterval(() => {
    let video = document.querySelector('video');
    
    (function() {
        console.log('execute.js executed');
      
        let video = document.querySelector('video');
      video.setAttribute("crossorigin", "anonymous");
      video.innerHTML = "<track></track><track></track>"
      let txtSubElem = video.nextSibling;
      txtSubElem.innerHTML = `<div style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; min-width: 48px; text-align: center; overflow: hidden;">
      <span style="white-space: nowrap;; padding: 0px 1rem; color: white; background-color: rgba(0, 0, 0, 0.8); direction: ltr; font-weight: 400; font-style: normal; left: 50%; transform: translateX(-50%); position: absolute; bottom: 9%; text-align: center; writing-mode: horizontal-tb;" id="sub1"></span>
      <span style="white-space: nowrap;; padding: 0px 1rem; color: white; background-color: rgba(0, 0, 0, 0.8); direction: ltr; font-weight: 400; font-style: normal; left: 50%; transform: translateX(-50%); position: absolute; bottom: 5%; text-align: center; writing-mode: horizontal-tb;" id="sub2"></span>
      </div>`;
      
      let track = document.querySelectorAll("track");
      
      let subtitleUrl;
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if(entry.name.includes('subtitle.vtt')){
              console.log(entry);
              subtitleUrl = entry.name;
              const regexp = /((.*)lang_)(.*)_(.*)/g;
              const languageSubtitle = [...subtitleUrl.matchAll(regexp)][0][3]; 
              // observer.disconnect();
      
              track[0].src = subtitleUrl.replace(languageSubtitle,"eng");
              track[0].srclang = "en";
              track[0].default = true;
              track[0].track.mode = "hidden"
              
              track[1].src = subtitleUrl.replace(languageSubtitle,"tha");
              track[1].srclang = "th";
              track[1].default = true;
              track[1].track.mode = "hidden"
              
              let sub1 = document.querySelector('#sub1');
              let sub2 = document.querySelector('#sub2');
              
              video.textTracks[0].oncuechange = function(e) {
                let cue = this.activeCues[0];
                if(cue){
                  sub1.innerHTML = cue.text;
                  // sub1.appendChild(cue.getCueAsHTML());
                }else{
                  sub1.innerHTML = '';
                }
              };
              video.textTracks[1].oncuechange = function(e) {
                let cue = this.activeCues[0];
                if(cue){
                  sub2.innerHTML = cue.text;
                  // sub2.appendChild(cue.getCueAsHTML());
                }else{
                  sub2.innerHTML = '';
                }
              };
            }
        });
      });

      observer.observe({ type: "resource", buffered: true });
      
      })();      
    
    if(video){
        clearInterval(intervalId)
    }
}, 100);
