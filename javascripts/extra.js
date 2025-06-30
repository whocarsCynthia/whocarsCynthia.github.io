document.addEventListener('DOMContentLoaded', function() {
  const letters = document.querySelectorAll('#hello-svg .letter');
  
  letters.forEach((letter, index) => {
    const length = Math.ceil(letter.getTotalLength());
    console.log(`字母 ${index+1} 路径长度:`, length);
    
    letter.style.strokeDasharray = length;
    letter.style.strokeDashoffset = length;
    letter.style.animationDelay = `${index * 0.3}s`; /* 字母间延迟 */
  });
});