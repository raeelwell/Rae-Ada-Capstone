import React from 'react';
import './Portraits.css';

import p0 from '../images/portraits/0.jpeg';
import p1 from '../images/portraits/1.jpeg';
import p2 from '../images/portraits/2.jpeg';
import p3 from '../images/portraits/3.jpeg';
import p4 from '../images/portraits/4.jpeg';
import p5 from '../images/portraits/5.jpeg';
import p6 from '../images/portraits/6.jpeg';
import p7 from '../images/portraits/7.jpeg';
import p8 from '../images/portraits/8.jpeg';
import p9 from '../images/portraits/9.jpeg';
import p10 from '../images/portraits/10.jpeg';
import p11 from '../images/portraits/11.jpeg';
import p12 from '../images/portraits/12.jpeg';
import p13 from '../images/portraits/13.jpeg';
import p14 from '../images/portraits/14.jpeg';
import p15 from '../images/portraits/15.jpeg';
import p16 from '../images/portraits/16.jpeg';
import p17 from '../images/portraits/17.jpeg';
import p18 from '../images/portraits/18.jpeg';
import p19 from '../images/portraits/19.jpeg';
import p20 from '../images/portraits/20.jpeg';
import p21 from '../images/portraits/21.jpeg';
import p22 from '../images/portraits/22.jpeg';
import p23 from '../images/portraits/23.jpeg';
import p24 from '../images/portraits/24.jpeg';
import p25 from '../images/portraits/25.jpeg';
import p26 from '../images/portraits/26.jpeg';
import p27 from '../images/portraits/27.jpeg';
import p28 from '../images/portraits/28.jpeg';
import p29 from '../images/portraits/29.jpeg';
import p30 from '../images/portraits/30.jpeg';
import p31 from '../images/portraits/31.jpeg';
import p32 from '../images/portraits/32.jpeg';
import p33 from '../images/portraits/33.jpeg';
import p34 from '../images/portraits/34.jpeg';
import p35 from '../images/portraits/35.jpeg';
import p36 from '../images/portraits/36.jpeg';
import p37 from '../images/portraits/37.jpeg';
import p38 from '../images/portraits/38.jpeg';
import p39 from '../images/portraits/39.jpeg';
import p40 from '../images/portraits/40.jpeg';
import p41 from '../images/portraits/41.jpeg';
import p42 from '../images/portraits/42.jpeg';
import p43 from '../images/portraits/43.jpeg';
import p44 from '../images/portraits/44.jpeg';
import p45 from '../images/portraits/45.jpeg';
import p46 from '../images/portraits/46.jpeg';
import p47 from '../images/portraits/47.jpeg';
import p48 from '../images/portraits/48.jpeg';

const Portraits = (props) => {
    const portraitList = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30, p31, p32,p33, p34, p35, p36, p37, p38, p39, p40, p41, p42, p43, p44, p45, p46, p47, p48]
    const index = props.portraitIndex

    const hideArrows = (ToF) => {
        if (ToF === false) {
            return (<div><button onClick={() => {
                cyclePortraits("left")
            }}>←</button><button onClick={() => {
                cyclePortraits("right")
            }}>→</button></div>)
    }};

    const hideGuide = (ToF) => {
        if (ToF === false) {
            return (<p>Select a Character</p>)
        }
    }

    const cyclePortraits = (direction) => {
        if (direction === "right") {
            let newIndex = index + 1
            if (newIndex === 49) {
                newIndex = 0
            };
            props.setPortraitIndex(newIndex)
        } else {
            let newIndex = index - 1
            if (newIndex === -1) {
                newIndex = 48
            }
            props.setPortraitIndex(newIndex)
        }
    };

    return (<div className="characterPortrait">
        <div className="hideGuide">{hideGuide(props.hideArrows)}</div>
        <img className="charImage" alt="character portrait" src={portraitList[props.portraitIndex]} width="200" height="200"></img>
        <div className="arrowKeys">{hideArrows(props.hideArrows)}</div>
        </div>)
};

export default Portraits