import React, { Component } from ‘react‘;

 
class ScrollBox extends Component {
 
  scrollToBottom = () => {
    const { scrollHeight, clientHeight } = this.box;
    /* 앞 코드에는 비구조화 할당 문법을 사용했습니다.
       다음 코드와 같은 의미입니다.
       const scrollHeight = this.box.scrollHeight;
       const clientHeight = this.box.cliengHeight;
    */
    this.box.scrollTop = scrollHeight - clientHeight;
  }

class ScrollBox extends Component {
  render() {
    const style = {
      border: ‘1px solid black‘,
      height: ‘300px‘,
      width: ‘300px‘,
      overflow: ‘auto‘,
      position: ‘relative‘
    };



<span class="co50">const</span><span class="cd2"> innerStyle </span><span class="co40">=</span><span class="cd2"> {</span>


      width: ‘100%‘,
      height: ‘650px‘,
      background: ‘linear-gradient(white, black)‘
    }



<span class="co50">return</span><span class="cd2"> (</span>


      <div 
        style={style}
        ref={(ref) => {this.box=ref}}>
        <div style={innerStyle}/>
      </div>
    );
  }
}



export default ScrollBox;