const pCK = require('proje-pc-kapat');//projemizin kapatma dosyasını kaynak dosyamıza dahil ediyoruz.

//alt kısımda fonksiyonları yazıyoruz htmlden gelen verileri aldık buradan.
function bilgisayarKapatZamanlayıcı(event) {
    var sayiDegeri = document.getElementById('yazıAlanı').value;
    //console.log(sayiDegeri);
    pCK.bilgisayarıKapat(sayiDegeri);
    geriSayim();//geri sayim baslat
}

function zamanlayıcıDurdur(){//geri sayım durdur
    pCK.kapatmaIptal();
    clearInterval(zamanlayıcı);
    var degerAl=document.getElementById('gösterge');
    degerAl.innerHTML="00";
}

var zamanlayıcı;//geri sayım özelliği
function geriSayim(){
    var sayiDegeri = document.getElementById('yazıAlanı').value;
    var islem=sayiDegeri;
    var degerAl=document.getElementById('gösterge');
    zamanlayıcı = setInterval(geriSay, 1000);
    function geriSay(){
        islem--;
        degerAl.innerHTML="kapanmaya -"+islem.toString()+"- saniye kaldı";
    }
}