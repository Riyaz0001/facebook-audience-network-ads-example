import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Content, IonicPage, NavController, NavParams } from 'ionic-angular';
declare var FacebookAds: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild(Content) content: Content;
    // coverImage: string;
    // iconURL: string;
    // adTitle: string;
    // adBody: string;
    // adSocialContext: string;
    // adBtn: string;
  
  
    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public platform: Platform) 
      {
        platform.ready().then(() => {
          this.content.ionScroll.subscribe((data) => {
            this.updateXY(data.scrollLeft, data.scrollTop);
          });
        this.showFacebookBannerAds();
        
      })
      // this.showFacebookBannerAds();
      // this.showFacebookNativeAds();
    }
  
    // Facebook Banner Ads.
    showFacebookBannerAds() {
      if(FacebookAds) {
        let options = {
          adId: '134282347099028_228636040996991',
          adSize: 'SMART_BANNER',
          isTesting: true,
          position: 8,
          autoShow: true
        };
    
        FacebookAds.createBanner(options,
          // Facebook return Success
          function(data) {
            console.log('Banner Ads Successfully Loaded');
            //FacebookAds.showBanner(8);
          },
          // Facebook return Error
          function(err) {
            console.log(err);
          });
        }
    }
  
    // Facebook Interstitial Ads.
    showFacebookInterstitialAds() {
      if(FacebookAds) {
        let options = {
          adId: '134282347099028_228636417663620',
          autoShow: false
        };
    
        FacebookAds.prepareInterstitial(options,
          // Facebook return Success
          function(data) {
            alert('Interstitial Ads Successfully Loaded');
            FacebookAds.showInterstitial();
          },
          // Facebook return Error
          function(err) {
            console.log(err);
          });
        }
    }
  
  
    // Facebook Interstitial Ads.
    showFacebookNativeAds() {
      if(FacebookAds) {
          FacebookAds.createNativeAd('134282347099028_228636700996925');
          // this.runAds = 1;
        }
        // check this event
        document.addEventListener('onAdLoaded', function(data) {
          let myAds: any = data;
          if(myAds.adType == "native") {
              document.getElementById('nativeAdCover').setAttribute('src', myAds.adRes.coverImage.url);
              document.getElementById('nativeAdIcon').setAttribute('src', myAds.adRes.icon.url);
              document.getElementById('nativeAdTitle').innerHTML = myAds.adRes.title;
              document.getElementById('nativeAdBody').innerHTML =  myAds.adRes.body;
              document.getElementById('nativeAdSocialContext').innerHTML =  myAds.adRes.socialContext;
              document.getElementById('nativeAdBtn').innerHTML = myAds.adRes.buttonText;     
          }
        });
    }
  
    updateXY(left, top){
      var d;
      var h, w, x, y;
       d = document.getElementById('native');
       var headHeight = document.getElementById("headerHeight").clientHeight;
       w = document.getElementById('native').clientWidth;
       h = document.getElementById('native').clientHeight;
       x = d.offsetLeft - left;
       y = d.offsetTop - (top - headHeight);
  
      // define facebook native ads
      if(FacebookAds)
      FacebookAds.setNativeAdClickArea('134282347099028_228636700996925', x, y, w, h);
    }
    ionViewDidEnter() {
      var that = this;
      this.platform.ready().then(() => {
        if(FacebookAds){
          FacebookAds.createNativeAd('134282347099028_228636700996925', function(data){
            // check this event
            document.addEventListener('onAdLoaded', function(data) {
              let myAds: any = data;
              if(myAds.adType == "native") {
                  document.getElementById('nativeAdCover').setAttribute("src", decodeURIComponent(myAds.adRes.coverImage.url));
                  document.getElementById('nativeAdIcon').setAttribute("src", decodeURIComponent(myAds.adRes.icon.url));
                  document.getElementById('nativeAdTitle').innerHTML = myAds.adRes.title;
                  document.getElementById('nativeAdBody').innerHTML =  myAds.adRes.body;
                  document.getElementById('nativeAdSocialContext').innerHTML =  myAds.adRes.socialContext;
                  document.getElementById('nativeAdBtn').innerHTML = myAds.adRes.buttonText;
                  that.updateXY(0, 0);   
              }
            });
  
            window.addEventListener('orientationchange', function(data){
              if(data.isTrusted == true)
              {
                that.updateXY(0, 0);
                // You can also get the values of x, y, w, h using javascript and then
                // assign it to the clickablearea method of FacebookAds.
              }
           });
    
          }, function(err) { alert(JSON.stringify(err)); });
        
        }
      
      })
    };

}
