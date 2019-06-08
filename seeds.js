const mongoose = require('mongoose');

const   Campground  = require("./models/campground"),
        Comment     = require('./models/comment');

var campground_data = [
    { 
        name: "Dark Precipice", 
        image: "https://farm2.staticflickr.com/1817/42111052125_9121fdd8f1.jpg", 
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et mattis augue, accumsan tincidunt erat. Donec ultrices mauris augue, id lacinia eros lobortis sit amet. Nam dictum fermentum dictum. Proin quis leo purus. Ut vitae enim commodo, finibus eros vel, ullamcorper mauris. Nunc eu quam ut nisi iaculis finibus vitae id neque. Sed accumsan porttitor eros eget porta. Cras ut turpis lobortis, tincidunt turpis nec, efficitur tellus. Morbi vehicula est et tincidunt hendrerit.

    Vivamus dui libero, gravida a pharetra a, hendrerit ut risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla faucibus justo id tincidunt laoreet. Phasellus sollicitudin elit ac lectus tincidunt gravida. Nam porta neque ullamcorper, posuere diam ac, suscipit diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus venenatis, ante a laoreet finibus, tortor neque maximus ante, vitae euismod ante tortor porta quam. Quisque nec nulla finibus, viverra nisl sit amet, dapibus lacus.
    
    Pellentesque sed interdum justo. Nulla efficitur eget velit vehicula suscipit. In vestibulum ultricies quam, eu interdum nunc aliquam non. In sollicitudin in nulla sit amet facilisis. Nunc lacinia, diam vel egestas tristique, tortor arcu convallis ex, nec iaculis augue mi a erat. Quisque id varius purus, a consectetur urna. Fusce molestie faucibus risus sed blandit.
    
    Phasellus iaculis, erat a fermentum ornare, ipsum tortor hendrerit risus, non blandit nunc dui eu mauris. Suspendisse eu risus ac neque aliquam finibus. Morbi dapibus dolor et tincidunt fermentum. Ut auctor eget orci in molestie. Donec vitae interdum leo. Suspendisse sit amet ipsum risus. Integer a volutpat mi. Sed vitae lobortis lorem. Etiam quis nunc facilisis, rutrum ipsum vitae, vestibulum turpis. Aenean nec euismod purus. Nulla ultricies, dolor ut rutrum consectetur, mauris tellus feugiat libero, quis fermentum ipsum enim fringilla augue. Donec accumsan quam vitae elit cursus, vel finibus libero faucibus. Nunc vehicula arcu nec mattis sagittis. Nam lacinia ante eu pharetra euismod. Vestibulum euismod nibh convallis massa bibendum, non commodo magna interdum.
    
    Nam vel euismod eros. Duis scelerisque nunc sit amet erat rutrum sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed arcu erat, placerat at dui at, dictum pulvinar nisi. Donec justo lorem, commodo vel fringilla quis, rutrum quis lacus. Suspendisse interdum non dui in gravida. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla eu elit orci. Cras tempor, diam placerat viverra rhoncus, tortor turpis laoreet leo, quis dapibus ex justo at quam. Aliquam vitae sem vestibulum, placerat diam vitae, laoreet felis. Donec gravida, urna ut malesuada tincidunt, mi orci aliquam ante, at accumsan augue turpis a enim. Maecenas a mauris sit amet metus consequat malesuada. Vestibulum rhoncus maximus tortor nec iaculis.` ,
        author: {
            id: "588c2e092403d111454fff76",
            username: "Plagieus"
        }
    },
    { 
        name: "Tanglebriar", 
        image: "https://farm8.staticflickr.com/7368/9811937955_03d073d6ef.jpg", 
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et mattis augue, accumsan tincidunt erat. Donec ultrices mauris augue, id lacinia eros lobortis sit amet. Nam dictum fermentum dictum. Proin quis leo purus. Ut vitae enim commodo, finibus eros vel, ullamcorper mauris. Nunc eu quam ut nisi iaculis finibus vitae id neque. Sed accumsan porttitor eros eget porta. Cras ut turpis lobortis, tincidunt turpis nec, efficitur tellus. Morbi vehicula est et tincidunt hendrerit.

Vivamus dui libero, gravida a pharetra a, hendrerit ut risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla faucibus justo id tincidunt laoreet. Phasellus sollicitudin elit ac lectus tincidunt gravida. Nam porta neque ullamcorper, posuere diam ac, suscipit diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus venenatis, ante a laoreet finibus, tortor neque maximus ante, vitae euismod ante tortor porta quam. Quisque nec nulla finibus, viverra nisl sit amet, dapibus lacus.

Pellentesque sed interdum justo. Nulla efficitur eget velit vehicula suscipit. In vestibulum ultricies quam, eu interdum nunc aliquam non. In sollicitudin in nulla sit amet facilisis. Nunc lacinia, diam vel egestas tristique, tortor arcu convallis ex, nec iaculis augue mi a erat. Quisque id varius purus, a consectetur urna. Fusce molestie faucibus risus sed blandit.

Phasellus iaculis, erat a fermentum ornare, ipsum tortor hendrerit risus, non blandit nunc dui eu mauris. Suspendisse eu risus ac neque aliquam finibus. Morbi dapibus dolor et tincidunt fermentum. Ut auctor eget orci in molestie. Donec vitae interdum leo. Suspendisse sit amet ipsum risus. Integer a volutpat mi. Sed vitae lobortis lorem. Etiam quis nunc facilisis, rutrum ipsum vitae, vestibulum turpis. Aenean nec euismod purus. Nulla ultricies, dolor ut rutrum consectetur, mauris tellus feugiat libero, quis fermentum ipsum enim fringilla augue. Donec accumsan quam vitae elit cursus, vel finibus libero faucibus. Nunc vehicula arcu nec mattis sagittis. Nam lacinia ante eu pharetra euismod. Vestibulum euismod nibh convallis massa bibendum, non commodo magna interdum.

Nam vel euismod eros. Duis scelerisque nunc sit amet erat rutrum sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed arcu erat, placerat at dui at, dictum pulvinar nisi. Donec justo lorem, commodo vel fringilla quis, rutrum quis lacus. Suspendisse interdum non dui in gravida. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla eu elit orci. Cras tempor, diam placerat viverra rhoncus, tortor turpis laoreet leo, quis dapibus ex justo at quam. Aliquam vitae sem vestibulum, placerat diam vitae, laoreet felis. Donec gravida, urna ut malesuada tincidunt, mi orci aliquam ante, at accumsan augue turpis a enim. Maecenas a mauris sit amet metus consequat malesuada. Vestibulum rhoncus maximus tortor nec iaculis.` ,
        author: {
            id: "588c2e092403d111454fff77",
            username: "Andromeodon"
        }
    },
    { name: "Blood Keep", 
    image: "https://farm8.staticflickr.com/7249/7468681958_9f0f6fac92.jpg", 
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et mattis augue, accumsan tincidunt erat. Donec ultrices mauris augue, id lacinia eros lobortis sit amet. Nam dictum fermentum dictum. Proin quis leo purus. Ut vitae enim commodo, finibus eros vel, ullamcorper mauris. Nunc eu quam ut nisi iaculis finibus vitae id neque. Sed accumsan porttitor eros eget porta. Cras ut turpis lobortis, tincidunt turpis nec, efficitur tellus. Morbi vehicula est et tincidunt hendrerit.

Vivamus dui libero, gravida a pharetra a, hendrerit ut risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla faucibus justo id tincidunt laoreet. Phasellus sollicitudin elit ac lectus tincidunt gravida. Nam porta neque ullamcorper, posuere diam ac, suscipit diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus venenatis, ante a laoreet finibus, tortor neque maximus ante, vitae euismod ante tortor porta quam. Quisque nec nulla finibus, viverra nisl sit amet, dapibus lacus.

Pellentesque sed interdum justo. Nulla efficitur eget velit vehicula suscipit. In vestibulum ultricies quam, eu interdum nunc aliquam non. In sollicitudin in nulla sit amet facilisis. Nunc lacinia, diam vel egestas tristique, tortor arcu convallis ex, nec iaculis augue mi a erat. Quisque id varius purus, a consectetur urna. Fusce molestie faucibus risus sed blandit.

Phasellus iaculis, erat a fermentum ornare, ipsum tortor hendrerit risus, non blandit nunc dui eu mauris. Suspendisse eu risus ac neque aliquam finibus. Morbi dapibus dolor et tincidunt fermentum. Ut auctor eget orci in molestie. Donec vitae interdum leo. Suspendisse sit amet ipsum risus. Integer a volutpat mi. Sed vitae lobortis lorem. Etiam quis nunc facilisis, rutrum ipsum vitae, vestibulum turpis. Aenean nec euismod purus. Nulla ultricies, dolor ut rutrum consectetur, mauris tellus feugiat libero, quis fermentum ipsum enim fringilla augue. Donec accumsan quam vitae elit cursus, vel finibus libero faucibus. Nunc vehicula arcu nec mattis sagittis. Nam lacinia ante eu pharetra euismod. Vestibulum euismod nibh convallis massa bibendum, non commodo magna interdum.

Nam vel euismod eros. Duis scelerisque nunc sit amet erat rutrum sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed arcu erat, placerat at dui at, dictum pulvinar nisi. Donec justo lorem, commodo vel fringilla quis, rutrum quis lacus. Suspendisse interdum non dui in gravida. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla eu elit orci. Cras tempor, diam placerat viverra rhoncus, tortor turpis laoreet leo, quis dapibus ex justo at quam. Aliquam vitae sem vestibulum, placerat diam vitae, laoreet felis. Donec gravida, urna ut malesuada tincidunt, mi orci aliquam ante, at accumsan augue turpis a enim. Maecenas a mauris sit amet metus consequat malesuada. Vestibulum rhoncus maximus tortor nec iaculis.`,
        author: {
            id: "588c2e092403d111454fff71",
            username: "Mothran"
        }
    },
    { name: "The Shademarch", 
    image: "https://farm3.staticflickr.com/2570/5846586795_570f3f8261.jpg", 
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et mattis augue, accumsan tincidunt erat. Donec ultrices mauris augue, id lacinia eros lobortis sit amet. Nam dictum fermentum dictum. Proin quis leo purus. Ut vitae enim commodo, finibus eros vel, ullamcorper mauris. Nunc eu quam ut nisi iaculis finibus vitae id neque. Sed accumsan porttitor eros eget porta. Cras ut turpis lobortis, tincidunt turpis nec, efficitur tellus. Morbi vehicula est et tincidunt hendrerit.

Vivamus dui libero, gravida a pharetra a, hendrerit ut risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla faucibus justo id tincidunt laoreet. Phasellus sollicitudin elit ac lectus tincidunt gravida. Nam porta neque ullamcorper, posuere diam ac, suscipit diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus venenatis, ante a laoreet finibus, tortor neque maximus ante, vitae euismod ante tortor porta quam. Quisque nec nulla finibus, viverra nisl sit amet, dapibus lacus.

Pellentesque sed interdum justo. Nulla efficitur eget velit vehicula suscipit. In vestibulum ultricies quam, eu interdum nunc aliquam non. In sollicitudin in nulla sit amet facilisis. Nunc lacinia, diam vel egestas tristique, tortor arcu convallis ex, nec iaculis augue mi a erat. Quisque id varius purus, a consectetur urna. Fusce molestie faucibus risus sed blandit.

Phasellus iaculis, erat a fermentum ornare, ipsum tortor hendrerit risus, non blandit nunc dui eu mauris. Suspendisse eu risus ac neque aliquam finibus. Morbi dapibus dolor et tincidunt fermentum. Ut auctor eget orci in molestie. Donec vitae interdum leo. Suspendisse sit amet ipsum risus. Integer a volutpat mi. Sed vitae lobortis lorem. Etiam quis nunc facilisis, rutrum ipsum vitae, vestibulum turpis. Aenean nec euismod purus. Nulla ultricies, dolor ut rutrum consectetur, mauris tellus feugiat libero, quis fermentum ipsum enim fringilla augue. Donec accumsan quam vitae elit cursus, vel finibus libero faucibus. Nunc vehicula arcu nec mattis sagittis. Nam lacinia ante eu pharetra euismod. Vestibulum euismod nibh convallis massa bibendum, non commodo magna interdum.

Nam vel euismod eros. Duis scelerisque nunc sit amet erat rutrum sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed arcu erat, placerat at dui at, dictum pulvinar nisi. Donec justo lorem, commodo vel fringilla quis, rutrum quis lacus. Suspendisse interdum non dui in gravida. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla eu elit orci. Cras tempor, diam placerat viverra rhoncus, tortor turpis laoreet leo, quis dapibus ex justo at quam. Aliquam vitae sem vestibulum, placerat diam vitae, laoreet felis. Donec gravida, urna ut malesuada tincidunt, mi orci aliquam ante, at accumsan augue turpis a enim. Maecenas a mauris sit amet metus consequat malesuada. Vestibulum rhoncus maximus tortor nec iaculis.`,
        author: {
            id: "588c2e092403d111454fff67",
            username: "The Dark Lord"
        }
    }
];

function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}).then(
        (all_cg_docs) => {
            console.log("removed campgrounds");
            Comment.deleteMany({}).then(
                (all_cm_docs) => {
                    console.log("removed comments");
                    campground_data.forEach( (cg) => {
                        Campground.create(cg).then(
                            (campground_doc) => {
                                console.log("created campground");
                                // console.log(campground_doc);
                                Comment.create(
                                    {
                                        text: "A good place to die",
                                        author: {
                                            id: "522c2e092403d111454fff71",
                                            username: "The Shadow Traveler"
                                        }
                                    }
                                ).then( (comment_doc) => {
                                    console.log("created comment");
                                    // console.log(campground_doc);
                                    campground_doc.comments.push( comment_doc );
                                    // console.log(campground_doc);
                                    campground_doc.save();
                                }).then( (updated_campground) => {
                                    console.log("Saved updated comment");
                                    // console.log(updated_campground);
                                });
                            }
                        );
                    });
                }
            )
        }
    )
}


module.exports = seedDB;