const words=["CAT","DOG","SUN","PEN","BAT"];let current=words[Math.floor(Math.random()*words.length)];
let missing=1;const correct=current[missing];
word.innerHTML=current[0]+" _ "+current[2];
const opts=[correct,...["A","E","I","O","U","B","D","N","T"].filter(x=>x!==correct)].sort(()=>Math.random()-.5).slice(0,3).sort(()=>Math.random()-.5);
letters.innerHTML="";
opts.forEach(l=>{let b=document.createElement("button");b.textContent=l;b.onclick=()=>pick(l);letters.appendChild(b);});
function pick(l){if(l===correct){word.innerHTML=current;msg.textContent="Correct!";cta.style.display="block";letters.innerHTML="";for(let i=0;i<30;i++){let c=document.createElement("div");c.className="confetti";c.style.left=(80+Math.random()*180)+"px";c.style.top="0";c.textContent=["🎉","✨","🎊"][i%3];document.querySelector(".board").appendChild(c);setTimeout(()=>c.remove(),2000);}}else{msg.textContent="Try Again!";document.querySelector(".board").classList.add("shake");setTimeout(()=>document.querySelector(".board").classList.remove("shake"),400);}}
cta.onclick=()=>alert("This is where the campaign landing page opens.");
