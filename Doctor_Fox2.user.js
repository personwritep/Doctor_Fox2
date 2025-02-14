// ==UserScript==
// @name        Doctor Fox2
// @namespace        http://tampermonkey.net/
// @version        0.6
// @description        「デザイン幅で表示」の参照データをリセットする
// @author        Ameba Blog User
// @match        https://blog.ameba.jp/ucs/entry/srventry*
// @exclude        https://blog.ameba.jp/ucs/entry/srventrylist*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameba.jp
// @grant        none
// @updateURL        https://github.com/personwritep/Doctor_Fox2/raw/main/Doctor_Fox2.user.js
// @downloadURL        https://github.com/personwritep/Doctor_Fox2/raw/main/Doctor_Fox2.user.js
// ==/UserScript==


let set_items=[];

let wysig_style=localStorage.getItem('GRACEFUL_STORAGE:PC_EDITOR:inputLayoutStyle');

if(!wysig_style){
    for(let k=0; k<5; k++){
        set_items[k]=['', '']; }
    panel_disp();
    action(0); }

else{
    detail();
    panel_disp();
    action(1); }



function detail(){
    let wysig_all=wysig_style.replace('}}', '').split('{')[2];
    let set_item=wysig_all.split('","');

    for(let k=0; k<4; k++){
        set_items[k]=set_item[k].split('":"'); }
    set_items[4]=set_item[4].split('":');
    set_items[2][1]=set_items[2][1].replace(/\\"/g, '"'); }



function panel_disp(){

    let help_url="https://ameblo.jp/personwritep/entry-12803527558.html";

    let help=
        '<a class="DF_help" href="'+ help_url +'" target="_blank">'+
        '<svg width="22" height="24" viewBox="0 0 150 150">'+
        '<path  fill="#fff" d="M66 13C56 15 47 18 39 24C-12 60 18 146 82 137C92 '+
        '135 102 131 110 126C162 90 128 4 66 13M68 25C131 17 145 117 81 '+
        '125C16 133 3 34 68 25M69 40C61 41 39 58 58 61C66 63 73 47 82 57C84 '+
        '60 83 62 81 65C77 70 52 90 76 89C82 89 82 84 86 81C92 76 98 74 100 66'+
        'C105 48 84 37 69 40M70 94C58 99 66 118 78 112C90 107 82 89 70 94z">'+
        '</path></svg>'+
        '<style>.DF_help { vertical-align: -6px; text-decoration: none; cursor: pointer; }'+
        '</style></a>';

    let panel=
        '<div id="DF_panel2">'+
        '<p class="d0">ストレージに登録されたWYSIWYG設定　　　'+ help +'</p>'+
        '<p>skinCode：'+ set_items[0][1] +'</p>'+
        '<p>useLayout：'+ set_items[1][1] +'</p>'+
        '<p>fontFamily：'+ set_items[2][1] +'</p>'+
        '<p>fontSize：'+ set_items[3][1] +'</p>'+
        '<p>width：'+ set_items[4][1] +'</p>'+

        '<p style="text-align: center">'+
        '<input id="new_set1" type="submit" value="登録をリセット">'+
        '<input id="new_set2" type="submit" value="マニュアル修復">'+
        '<span id="man">'+
        'fontSize：<span class="unit"><input id="man_f" type="number"></span>'+
        'width：<input id="man_w" type="number">'+
        '<input id="man_set3" type="submit" value="登録"></span>'+
        '<input id="close_df" type="submit" value="終了"></p>'+
        '<p id="add_mess0" class="d2">'+
        '▶ WYSIWYG設定が削除されています<br>'+
        '<span class="d1">'+
        '「登録をリセット」を押し WYSIWYG設定の再生成を試みてください</span></p>'+
        '<p id="add_mess1" class="d2">'+
        '▶ ダッシュボードで「Doctor Fox2」をOFFにして 編集画面を終了します</p>'+
        '</div>'+
        '<style>'+
        '#DF_panel2 { position: fixed; top: 30vh; left: calc(50% - 380px); z-index: 100; '+
        'font: bold 16px/30px Meiryo; padding: 10px 20px; border: 1px solid #aaa; '+
        'background: #fff; box-shadow: 10px 20px 40px #bac0c4; '+
        'width: 620px; box-sizing: border-box; } '+
        '.d0 { padding: 7px 0 0; height: 34px; margin: 12px 0 20px; text-align: center; '+
        'color: #fff; background: #2196f3; } '+
        '.d1 { color: #444; padding-left: 1em; font-weight: normal; } '+
        '.d2 { color: red; } '+
        '.DF_help { vertical-align: -6px; text-decoration: none; cursor: pointer; } '+
        '#new_set1, #new_set2, #man_set3, #close_df { padding: 5px 20px 3px; color: #fff; '+
        'border: 1px solid #aaa; border-radius: 4px; background: #2196f3; '+
        'margin: 30px 1em 10px; } '+
        '#new_set1:hover, #new_set2:hover, #man_set3:hover, #close_df:hover '+
        '{ background: #1565c0; } '+
        '#man { margin-right: 1em; display: none; } '+
        '#man_f { width: 70px; padding: 4px 2px 2px 6px; margin: 0 1em 0 0; } '+
        '.unit { position: relative; } '+
        '.unit:before { position: absolute; content: "px"; left: 32px; bottom: -3px; } '+
        '#man_w { width: 58px; padding: 4px 2px 2px 6px; margin: 0 1em 0 0; } '+
        '#DF_panel2 input:focus { border: 2px solid #2196f3; border-radius: 3px; '+
        'box-shadow: none; } '+
        '#add_mess0, #add_mess1 { display: none; } '+
        '</style>';

    if(document.querySelector('#DF_panel2')){
        document.querySelector('#DF_panel2').remove(); }
    document.body.insertAdjacentHTML('beforeend', panel);

} // panel_disp()



function action(n){
    let new_set1=document.querySelector('#new_set1');
    let new_set2=document.querySelector('#new_set2');
    let man=document.querySelector('#man');
    let close_df=document.querySelector('#close_df');
    let add_mess0=document.querySelector('#add_mess0');
    let add_mess1=document.querySelector('#add_mess1');

    if(n==0){
        add_mess0.style.display='block'; }

    new_set1.onclick=function(){ // ストレージの登録を削除
        localStorage.removeItem('GRACEFUL_STORAGE:PC_EDITOR:inputLayoutStyle');

        for(let k=0; k<5; k++){
            set_items[k]=['', '']; }
        panel_disp();

        setTimeout(()=>{
            if(n==0){
                add_mess0.style.display='none'; }
            new_set1.style.display='none';
            close_df.style.display='none';
            auto_check();
        }, 200); }



    new_set2.onclick=function(){ // ストレージの登録をマニュアル指定
        new_set1.remove();
        new_set2.remove();
        man.style.display='inline-block';

        let man_f=document.querySelector('#man_f ');
        let man_w=document.querySelector('#man_w');
        let man_set3=document.querySelector('#man_set3');
        if(man_f && man_w && man_set3){

            man_f.value=parseInt(set_items[3][1].replace(/[^0-9]/g, ''), 10);
            man_w.value=parseInt(set_items[4][1], 10);

            let editor_iframe=document.querySelector('.cke_wysiwyg_frame');
            if(editor_iframe){ // iframe読込みが実行条件
                let iframe_doc=editor_iframe.contentWindow.document;
                if(iframe_doc){
                    let iframe_body=iframe_doc.querySelector('body.cke_editable');
                    if(iframe_body){
                        man_f.max=24;
                        man_f.min=12;
                        let max_width=editor_iframe.getBoundingClientRect().width - 32;
                        man_w.max=max_width;
                        man_w.min=300;

                        man_w.addEventListener('input', function(){
                            iframe_body.style.width=(man_w.value/1)+'px'; });
                    }}}}


        man_set3.onclick=function(){
            let wysig=localStorage.getItem('GRACEFUL_STORAGE:PC_EDITOR:inputLayoutStyle');
            if(wysig){
                let wysig_top=wysig.split('"fontFamily":"')[0];
                let wysig_new=wysig_top +
                    '"fontFamily":"-apple-system, BlinkMacSystemFont, sans-serif","fontSize":"'+
                    man_f.value +'px","width":'+ man_w.value + '}}';

                localStorage.setItem('GRACEFUL_STORAGE:PC_EDITOR:inputLayoutStyle', wysig_new);

                setTimeout(()=>{
                    location.reload();
                }, 1000); }}
    }



    close_df.onclick=function(){ // 終了表示
        setTimeout(()=>{
            if(n==0){
                add_mess0.style.display='none'; }
            new_set1.remove();
            new_set2.remove();
            man.remove();
            close_df.remove();
            add_mess1.style.display='inline';
        }, 200); }

} // action()



function auto_check(){
    let ch_buttom=document.querySelector('#applyStyleWidth');
    if(ch_buttom){
        if(ch_buttom.checked){
            ch_buttom.click();
            setTimeout(()=>{
                ch_buttom.click(); }, 1000); }
        else{
            ch_buttom.click(); }}

    setTimeout(()=>{
        wysig_style=localStorage.getItem('GRACEFUL_STORAGE:PC_EDITOR:inputLayoutStyle');
        if(!wysig_style){
            for(let k=0; k<5; k++){
                set_items[k]=['', '']; }
            panel_disp();
            action(0); }
        else{
            detail();
            panel_disp();
            action(1); }
    }, 2000);

} // auto_check()



