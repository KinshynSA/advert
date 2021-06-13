const Alert = {
  timeToLive: 8,

  images: {
    success: `
      <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.18213 14.8535L13.5641 20.0202L22.1752 11.4091" stroke="#4CAE01" stroke-width="2"/>
      <circle cx="15.5" cy="15.5" r="14.5" stroke="#4CAE01" stroke-width="2"/>
      </svg>
    `,
    error: `
      <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.47853 29.75L20.5 2L36.5215 29.75H4.47853Z" stroke="#FFB400" stroke-width="2"/>
      <line x1="20.584" y1="11" x2="20.584" y2="21" stroke="#FFB400" stroke-width="2"/>
      <line x1="20.584" y1="23.5" x2="20.584" y2="26" stroke="#FFB400" stroke-width="2"/>
      </svg>
    `,
    close: `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H35C37.7614 0 40 2.23858 40 5V40H0V0Z" fill="white"/>
      <path d="M28 12L12 28" stroke="black" stroke-width="2"/>
      <path d="M12 12L28 28" stroke="black" stroke-width="2"/>
      </svg>
    `
  },

  success: function(text, stable = false){
    this.renderAlert(text,'alert_block-succes',this.images.success,stable)
  },

  error: function(text, stable = false){
    this.renderAlert(text,'alert_block-error',this.images.error,stable)
  },

  create: function(tag,cl,parent,content){
    let elem = document.createElement(tag);
    if(cl) elem.classList.add(cl);
    if(content) elem.innerHTML = content;
    if(parent) parent.append(elem);
    return elem;
  },

  renderAlert: function(text,cl,img,stable){
    if(document.querySelector('.alert_container')){
      this.container = document.querySelector('.alert_container');
    } else {
      this.container = this.create('div','alert_container',document.querySelector('body'));
      this.container.classList.add('main-block');
    }    

    let wrapper = this.create('div','alert_wrapper',this.container);

    let block = this.create('div','alert_block',wrapper);
    block.classList.add(`${cl}`);
    if(stable) block.classList.add('alert_block-forwards');
    block.style.animationDuration = `${this.timeToLive}s`;

    let content = this.create('div','alert_content',block);
    this.create('figure',false,content,img);
    this.create('span',false,content,text);

    let close = this.create('a','alert_close',block,this.images.close);
    close.onclick = function(){
      wrapper.classList.add('alert_wrapper-hidden')

      setTimeout(() => {
        if(wrapper) wrapper.remove();
      }, (this.timeToLive + 2) * 1000)   
    };

    if(!stable){
      setTimeout(() => {
        wrapper.remove();
      }, (this.timeToLive + 2) * 1000)      
    }
  }
}

export default Alert;