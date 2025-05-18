import lvl1 from "../images/1.png"
import lvl2 from "../images/2.png"
import lvl3 from "../images/3.png"
import lvl4 from "../images/4.png"
import lvl5 from "../images/5.png"
import lvl6 from "../images/6.png"
import lvl7 from "../images/7.png"
import lvl8 from "../images/8.png"
import lvl9 from "../images/9.png"
import lvl10 from "../images/10.png"

export function checkRating(rating) {
    let img = lvl1;
    if (rating <= 500) {
        img = lvl1;
    } else if (rating <= 750) {
        img = lvl2;
    } else if (rating <= 900) {
        img = lvl3;
    } else if (rating <= 1050) {
        img = lvl4;
    } else if (rating <= 1200) {
        img = lvl5;
    } else if (rating <= 1350) {
        img = lvl6;
    } else if (rating <= 1530) {
        img = lvl7;
    } else if (rating <= 1750) {
        img = lvl8;
    } else if (rating <= 2000) {
        img = lvl9;
    } else {
        img = lvl10;
    }
    return img
}