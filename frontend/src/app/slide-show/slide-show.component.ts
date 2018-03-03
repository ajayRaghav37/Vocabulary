import { Component, OnInit } from '@angular/core';
import { resolve } from 'q';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  imgUrls: string[] = ['https://outdoorsindoors.files.wordpress.com/2014/03/morocco_1043.jpg', 'http://www.the-wanderlusters.com/wp-content/upload…hara-Desert-Nomad-Camps-Morocco-Wanderlusters.jpg', 'http://www.joaoleitao.com/wp-content/uploads/2015/04/Sahara-Desert-Nomads.jpg', 'http://www.joaoleitao.com/wp-content/uploads/2015/04/Nomads-Sahara-Morocco.jpg', 'https://www.harappa.com/sites/default/files/slides/desert-nomads.jpg', 'http://www.joaoleitao.com/wp-content/uploads/2015/04/Goats-Morocco-Desert.jpg', 'http://camelphotos.com/GraphicsP7/bedouin2_tent.jpg', 'http://courses.wcupa.edu/jones/his312/maps/..%5C/his311/archives/pix/tanezrou.gif', 'https://s-media-cache-ak0.pinimg.com/originals/e6/6a/ed/e66aed05fa789b641abd6c124943967f.jpg', 'http://www.allempires.com/Uploads/tent.jpg', 'blah'];
  selIndex: number = -1;
  disabledButtons = false;
  showSettings = false;
  darkness = 0.5;
  blurness = 7;

  constructor() {

  }

  ngOnInit() {
    this.changeImage(1);
  }

  private validateImgUrl(url, callback) {
    let img = new Image();

    console.log('Trying to load ' + url);
    img.src = url;

    img.onload = function () {
      callback(true);
    };

    img.onerror = function () {
      callback(false);
    };
  }

  changeImage(diff) {
    if (this.selIndex + diff < 0 || this.selIndex + diff > this.imgUrls.length - 1) {
      this.disabledButtons = false;
      return;
    }

    this.disabledButtons = true;
    let index = (this.selIndex + diff);

    let tryChangingImage = new Promise((resolve, reject) => {
      this.validateImgUrl(this.imgUrls[index], function (isValid) {
        if (isValid === false)
          reject('Unresolved URL');
        else
          resolve();
      });
    });

    tryChangingImage.then(() => {
      this.selIndex += diff;
      this.disabledButtons = false;
    }).catch((reason) => {
      this.changeImage(diff > 0 ? diff + 1 : diff - 1);
    });
  }
}