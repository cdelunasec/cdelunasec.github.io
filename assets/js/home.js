/* Home: terminal en vivo con datos de la sesión del visitante y de GitHub */
(function(){
const t=(a,b)=>CDL.t(a,b);
const lt=document.getElementById("liveTerm");if(!lt)return;
const ua=navigator.userAgent;
const br=/Edg\//.test(ua)?"Edge":/OPR\//.test(ua)?"Opera":/Brave/.test(ua)||navigator.brave?"Brave":/Firefox\//.test(ua)?"Firefox":/Chrome\//.test(ua)?"Chrome":/Safari\//.test(ua)?"Safari":"?";
const os=/Windows/.test(ua)?"Windows":/Android/.test(ua)?"Android":/iPhone|iPad/.test(ua)?"iOS":/Mac OS/.test(ua)?"macOS":/Linux/.test(ua)?"Linux":"?";
let tz="n/a";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}
const P='<span class="p">deluna@kali:~$</span> ';
let GH=null;
fetch("https://api.github.com/users/cdelunasec").then(r=>r.ok?r.json():{}).then(j=>{GH=j;fill()}).catch(()=>{GH={};fill()});
function gh(k){return `<span class="gh" data-k="${k}">...</span>`}
function fill(){if(!GH)return;lt.querySelectorAll(".gh").forEach(e=>{let v=GH[e.dataset.k];if(e.dataset.k==="created_at"&&v)v=v.slice(0,4);e.textContent=v??"n/a"})}
function build(){return[
 P+'<span class="c">init cristian_de_luna</span>','<span class="g">[OK]</span> '+t("perfil cargado","identity core loaded"),
 P+'<span class="c">scan --visitor</span>','<span class="o">'+t("objetivo adquirido -> tu sesión","target acquired -> your session")+'</span>',
 '<span class="o">'+t("navegador ","browser   ")+' :</span> '+br,'<span class="o">'+t("sistema   ","platform  ")+' :</span> '+os,
 '<span class="o">viewport   :</span> '+innerWidth+'x'+innerHeight,'<span class="o">'+t("zona      ","timezone  ")+' :</span> '+tz,
 '<span class="o">'+t("veredicto ","verdict   ")+' :</span> <span class="g">'+t("sesión limpia. bienvenido.","session looks clean. welcome.")+'</span>',
 P+'<span class="c">fetch --source github.com/cdelunasec</span>',
 '<span class="o">public_repos :</span> '+gh("public_repos"),'<span class="o">followers    :</span> '+gh("followers"),'<span class="o">since        :</span> '+gh("created_at"),
 P+'<span class="c">cat certs.txt</span>','<span class="g">[✓]</span> HTB CJCA          HTBCERT-1EEEAABC33','<span class="g">[✓]</span> CCNA ITN          Cisco NetAcad','<span class="g">[✓]</span> IT Essentials     Cisco NetAcad','<span class="y">[→]</span> HTB CPTS          '+t("siguiente","next"),
 P+'<span class="c">status --this-page</span>','<span class="o">transport  :</span> '+(location.protocol==="https:"?t("HTTPS (cifrado)","HTTPS (encrypted)"):"HTTP"),'<span class="o">render     :</span> '+t("estático, sin cookies, sin rastreadores","static, no cookies, no trackers"),
 P+'<span class="c">█</span>']}
let started=false,timer=null;
function play(instant){clearInterval(timer);const L=build();
  if(instant){lt.innerHTML=L.join("\n");fill();return}
  let i=0;lt.innerHTML="";timer=setInterval(()=>{lt.insertAdjacentHTML("beforeend",(i?"\n":"")+L[i]);fill();i++;if(i>=L.length)clearInterval(timer)},150)}
const io=new IntersectionObserver(e=>{if(e[0].isIntersecting&&!started){started=true;play(false);io.disconnect()}});io.observe(lt);
setTimeout(()=>{if(!started){started=true;play(true)}},5000);
CDL.onLang(()=>{if(started)play(true)});
})();
