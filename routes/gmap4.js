const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res, next) => {
    db.Detail.findAll().then(dtl => {
        var data = {
            title: 'Board/Index',
            content: dtl
        }
        res.render('gmap4', data);
    });
});

var ready = { api: false, ajax: false };
var map;
var mapData;
var mapOptions = {
    center: { // 地図の緯度経度
        lat: 35.700000,
        lng: 139.772000
    },
    zoom: 17, // 地図の拡大率
    scrollwheel: false, // ホイール操作で拡大縮小させるかどうか
    mapTypeControl: false, // マップ切り替えのコントロールを表示するかどうか
    streetViewControl: false // ストリートビューのコントロールを表示するかどうか
}
 
$(function() {
    $.ajax({
        url: 'data.json',
        cache: false
    })
    .then(
        function (data) {
            mapData = data['data'];
            ready['ajax'] = true;
            generate_map();
        },
        function () {
            console.log('取得に失敗しました。');
        }
    );
 
    $('[data-category]').on('click', function() {
        var category = $(this).data('category');
        change_category(category);
    });
});
 
/**
 * Google Maps APIの準備完了後の処理
 */
function api_ready() {
    ready['api'] = true;
    generate_map();
}
 
/**
 * 地図を生成する
 */
function generate_map() {
    if(ready['api'] && ready['ajax']) {
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        add_marker();
    }
}
 
/**
 * 地図にマーカーを追加する
 */
function add_marker() {
    for (var i = 0; i < mapData.length; i++) {
        var item = mapData[i];
         
        // マーカーの設置
        var marker = new google.maps.Marker({
            position: item['latlng'],
            map: map,
            icon: {
                url: mapData[i]['icon'] + '.png',
                scaledSize : new google.maps.Size(30, 30)
            }
        });
 
        // 吹き出しの生成
        var ins = '<div class="map-window">';
            ins += '<p class="map-window_name">' + item['name'] + '</p>';
        ins += '</div>';
        var infoWindow = new google.maps.InfoWindow({
            content: ins
        });
 
        // マーカーのイベント設定
        add_event_to_marker(marker, infoWindow, i);
    }
}
 
/**
 * マーカーにイベントを追加する
 * @param {object} marker     (required) マーカーの情報
 * @param {object} infoWindow (required) 吹き出しの情報
 * @param {number} index      (required) 地図情報のインデックス番号
 */
function add_event_to_marker(marker, infoWindow, index) {
    var item = mapData[index];
    item['marker'] = marker;
    item['infoWindow'] = infoWindow;
 
    // マーカークリック時に吹き出しを表示する
    item['marker'].addListener('click', function(e) {
        infoWindows_hide();
        item['infoWindow'].open(map, item['marker']);
    });
}
 
/**
 * 吹き出しを非表示にする
 */
function infoWindows_hide() {
    for (var i = 0; i < mapData.length; i++) {
        mapData[i]['infoWindow'].close();
    }
}
 
/**
 * 地図上のマーカー表示を切り替える
 * @param {object} category (required) 表示するマーカーのカテゴリ
 */
function change_category(category) {
    // 表示されている吹き出しを非表示にする
    infoWindows_hide();
    // カテゴリ別に切り替える場合
    if(category !== '') {
        for (var i = 0; i < mapData.length; i++) {
            var item = mapData[i];
            item['marker'].setVisible(false);
            for (var j = 0; j < item['category'].length; j++) {
                if(item['category'][j] === category) {
                    item['marker'].setVisible(true);
                    break;
                }
            }
        }
    // 全件表示の場合
    } else {
        for (var i = 0; i < mapData.length; i++) {
            mapData[i]['marker'].setVisible(true);
        }
    }
}

 module.exports = router;