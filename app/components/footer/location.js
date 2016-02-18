/*##20130301##*/


//是否展示promise 图标
pageConfig.promiseIcon='enable';
//当前页面Host
var locPageHost = pageConfig.FN_getDomain();

//当前分类编号
var pType = pageConfig.product.pType;
//区域cookie名称
var cName = "ipLocation";
//区域-省
var iplocation = {"北京": { id: "1", root: 0, djd: 1,c:72 },"上海": { id: "2", root: 1, djd: 1,c:78 },"天津": { id: "3", root: 0, djd: 1,c:51035 },"重庆": { id: "4", root: 3, djd: 1,c:113 },"河北": { id: "5", root: 0, djd: 1,c:142 },"山西": { id: "6", root: 0, djd: 1,c:303 },"河南": { id: "7", root: 0, djd: 1,c:412 },"辽宁": { id: "8", root: 0, djd: 1,c:560 },"吉林": { id: "9", root: 0, djd: 1,c:639 },"黑龙江": { id: "10", root: 0, djd: 1,c:698 },"内蒙古": { id: "11", root: 0, djd: 0,c:799 },"江苏": { id: "12", root: 1, djd: 1,c:904 },"山东": { id: "13", root: 0, djd: 1,c:1000 },"安徽": { id: "14", root: 1, djd: 1,c:1116 },"浙江": { id: "15", root: 1, djd: 1,c:1158 },"福建": { id: "16", root: 2, djd: 1,c:1303 },"湖北": { id: "17", root: 0, djd: 1,c:1381 },"湖南": { id: "18", root: 2, djd: 1,c:1482 },"广东": { id: "19", root: 2, djd: 1,c:1601 },"广西": { id: "20", root: 2, djd: 1,c:1715 },"江西": { id: "21", root: 2, djd: 1,c:1827 },"四川": { id: "22", root: 3, djd: 1,c:1930 },"海南": { id: "23", root: 2, djd: 1,c:2121 },"贵州": { id: "24", root: 3, djd: 1,c:2144 },"云南": { id: "25", root: 3, djd: 1,c:2235 },"西藏": { id: "26", root: 3, djd: 0,c:2951 },"陕西": { id: "27", root: 3, djd: 1,c:2376 },"甘肃": { id: "28", root: 3, djd: 1,c:2487 },"青海": { id: "29", root: 3, djd: 0,c:2580 },"宁夏": { id: "30", root: 3, djd: 1,c:2628 },"新疆": { id: "31", root: 3, djd: 0,c:2652 },"台湾": { id: "32", root: 2, djd: 0,c:2768 },"香港": { id: "42", root: 2, djd: 0,c:2754 },"澳门": { id: "43", root: 2, djd: 0,c:2770 },"钓鱼岛": { id: "84", root: 2, djd: 0,c:84 }};
//区域-市
var provinceCityJson = {"1":[{"id":72,"name":"朝阳区"},{"id":2800,"name":"海淀区"},{"id":2801,"name":"西城区"},{"id":2802,"name":"东城区"},{"id":2803,"name":"崇文区"},{"id":2804,"name":"宣武区"},{"id":2805,"name":"丰台区"},{"id":2806,"name":"石景山区"},{"id":2807,"name":"门头沟"},{"id":2808,"name":"房山区"},{"id":2809,"name":"通州区"},{"id":2810,"name":"大兴区"},{"id":2812,"name":"顺义区"},{"id":2814,"name":"怀柔区"},{"id":2816,"name":"密云区"},{"id":2901,"name":"昌平区"},{"id":2953,"name":"平谷区"},{"id":3065,"name":"延庆县"}],"2":[{"id":2813,"name":"徐汇区"},{"id":2815,"name":"长宁区"},{"id":2817,"name":"静安区"},{"id":2820,"name":"闸北区"},{"id":2822,"name":"虹口区"},{"id":2823,"name":"杨浦区"},{"id":2824,"name":"宝山区"},{"id":2825,"name":"闵行区"},{"id":2826,"name":"嘉定区"},{"id":2830,"name":"浦东新区"},{"id":2833,"name":"青浦区"},{"id":2834,"name":"松江区"},{"id":2835,"name":"金山区"},{"id":2837,"name":"奉贤区"},{"id":2841,"name":"普陀区"},{"id":2919,"name":"崇明县"},{"id":78,"name":"黄浦区"}],"3":[{"id":51035,"name":"东丽区"},{"id":51036,"name":"和平区"},{"id":51037,"name":"河北区"},{"id":51038,"name":"河东区"},{"id":51039,"name":"河西区"},{"id":51040,"name":"红桥区"},{"id":51041,"name":"蓟县"},{"id":51042,"name":"静海县"},{"id":51043,"name":"南开区"},{"id":51044,"name":"塘沽区"},{"id":51045,"name":"西青区"},{"id":51046,"name":"武清区"},{"id":51047,"name":"津南区"},{"id":51048,"name":"汉沽区"},{"id":51049,"name":"大港区"},{"id":51050,"name":"北辰区"},{"id":51051,"name":"宝坻区"},{"id":51052,"name":"宁河县"}],"4":[{"id":113,"name":"万州区"},{"id":114,"name":"涪陵区"},{"id":115,"name":"梁平县"},{"id":119,"name":"南川区"},{"id":123,"name":"潼南县"},{"id":126,"name":"大足区"},{"id":128,"name":"黔江区"},{"id":129,"name":"武隆县"},{"id":130,"name":"丰都县"},{"id":131,"name":"奉节县"},{"id":132,"name":"开县"},{"id":133,"name":"云阳县"},{"id":134,"name":"忠县"},{"id":135,"name":"巫溪县"},{"id":136,"name":"巫山县"},{"id":137,"name":"石柱县"},{"id":138,"name":"彭水县"},{"id":139,"name":"垫江县"},{"id":140,"name":"酉阳县"},{"id":141,"name":"秀山县"},{"id":48131,"name":"璧山县"},{"id":48132,"name":"荣昌县"},{"id":48133,"name":"铜梁县"},{"id":48201,"name":"合川区"},{"id":48202,"name":"巴南区"},{"id":48203,"name":"北碚区"},{"id":48204,"name":"江津区"},{"id":48205,"name":"渝北区"},{"id":48206,"name":"长寿区"},{"id":48207,"name":"永川区"},{"id":50950,"name":"江北区"},{"id":50951,"name":"南岸区"},{"id":50952,"name":"九龙坡区"},{"id":50953,"name":"沙坪坝区"},{"id":50954,"name":"大渡口区"},{"id":50995,"name":"綦江区"},{"id":51026,"name":"渝中区"},{"id":51027,"name":"高新区"},{"id":51028,"name":"北部新区"},{"id":4164,"name":"城口县"}],"5":[{"id":142,"name":"石家庄市"},{"id":148,"name":"邯郸市"},{"id":164,"name":"邢台市"},{"id":199,"name":"保定市"},{"id":224,"name":"张家口市"},{"id":239,"name":"承德市"},{"id":248,"name":"秦皇岛市"},{"id":258,"name":"唐山市"},{"id":264,"name":"沧州市"},{"id":274,"name":"廊坊市"},{"id":275,"name":"衡水市"}],"6":[{"id":303,"name":"太原市"},{"id":309,"name":"大同市"},{"id":318,"name":"阳泉市"},{"id":325,"name":"晋城市"},{"id":330,"name":"朔州市"},{"id":336,"name":"晋中市"},{"id":350,"name":"忻州市"},{"id":368,"name":"吕梁市"},{"id":379,"name":"临汾市"},{"id":398,"name":"运城市"},{"id":3074,"name":"长治市"}],"7":[{"id":412,"name":"郑州市"},{"id":420,"name":"开封市"},{"id":427,"name":"洛阳市"},{"id":438,"name":"平顶山市"},{"id":446,"name":"焦作市"},{"id":454,"name":"鹤壁市"},{"id":458,"name":"新乡市"},{"id":468,"name":"安阳市"},{"id":475,"name":"濮阳市"},{"id":482,"name":"许昌市"},{"id":489,"name":"漯河市"},{"id":495,"name":"三门峡市"},{"id":502,"name":"南阳市"},{"id":517,"name":"商丘市"},{"id":527,"name":"周口市"},{"id":538,"name":"驻马店市"},{"id":549,"name":"信阳市"},{"id":2780,"name":"济源市"}],"8":[{"id":560,"name":"沈阳市"},{"id":573,"name":"大连市"},{"id":579,"name":"鞍山市"},{"id":584,"name":"抚顺市"},{"id":589,"name":"本溪市"},{"id":593,"name":"丹东市"},{"id":598,"name":"锦州市"},{"id":604,"name":"葫芦岛市"},{"id":609,"name":"营口市"},{"id":613,"name":"盘锦市"},{"id":617,"name":"阜新市"},{"id":621,"name":"辽阳市"},{"id":632,"name":"朝阳市"},{"id":6858,"name":"铁岭市"}],"9":[{"id":639,"name":"长春市"},{"id":644,"name":"吉林市"},{"id":651,"name":"四平市"},{"id":2992,"name":"辽源市"},{"id":657,"name":"通化市"},{"id":664,"name":"白山市"},{"id":674,"name":"松原市"},{"id":681,"name":"白城市"},{"id":687,"name":"延边州"}],"10":[{"id":727,"name":"鹤岗市"},{"id":731,"name":"双鸭山市"},{"id":737,"name":"鸡西市"},{"id":742,"name":"大庆市"},{"id":753,"name":"伊春市"},{"id":757,"name":"牡丹江市"},{"id":765,"name":"佳木斯市"},{"id":773,"name":"七台河市"},{"id":776,"name":"黑河市"},{"id":782,"name":"绥化市"},{"id":793,"name":"大兴安岭地区"},{"id":698,"name":"哈尔滨市"},{"id":712,"name":"齐齐哈尔市"}],"11":[{"id":799,"name":"呼和浩特市"},{"id":805,"name":"包头市"},{"id":810,"name":"乌海市"},{"id":812,"name":"赤峰市"},{"id":823,"name":"乌兰察布市"},{"id":835,"name":"锡林郭勒盟"},{"id":848,"name":"呼伦贝尔市"},{"id":870,"name":"鄂尔多斯市"},{"id":880,"name":"巴彦淖尔市"},{"id":891,"name":"阿拉善盟"},{"id":895,"name":"兴安盟"},{"id":902,"name":"通辽市"}],"12":[{"id":904,"name":"南京市"},{"id":911,"name":"徐州市"},{"id":919,"name":"连云港市"},{"id":925,"name":"淮安市"},{"id":933,"name":"宿迁市"},{"id":939,"name":"盐城市"},{"id":951,"name":"扬州市"},{"id":959,"name":"泰州市"},{"id":965,"name":"南通市"},{"id":972,"name":"镇江市"},{"id":978,"name":"常州市"},{"id":984,"name":"无锡市"},{"id":988,"name":"苏州市"}],"13":[{"id":2900,"name":"济宁市"},{"id":1000,"name":"济南市"},{"id":1007,"name":"青岛市"},{"id":1016,"name":"淄博市"},{"id":1022,"name":"枣庄市"},{"id":1025,"name":"东营市"},{"id":1032,"name":"潍坊市"},{"id":1042,"name":"烟台市"},{"id":1053,"name":"威海市"},{"id":1058,"name":"莱芜市"},{"id":1060,"name":"德州市"},{"id":1072,"name":"临沂市"},{"id":1081,"name":"聊城市"},{"id":1090,"name":"滨州市"},{"id":1099,"name":"菏泽市"},{"id":1108,"name":"日照市"},{"id":1112,"name":"泰安市"}],"14":[{"id":1151,"name":"黄山市"},{"id":1159,"name":"滁州市"},{"id":1167,"name":"阜阳市"},{"id":1174,"name":"亳州市"},{"id":1180,"name":"宿州市"},{"id":1201,"name":"池州市"},{"id":1206,"name":"六安市"},{"id":2971,"name":"宣城市"},{"id":1114,"name":"铜陵市"},{"id":1116,"name":"合肥市"},{"id":1121,"name":"淮南市"},{"id":1124,"name":"淮北市"},{"id":1127,"name":"芜湖市"},{"id":1132,"name":"蚌埠市"},{"id":1137,"name":"马鞍山市"},{"id":1140,"name":"安庆市"}],"15":[{"id":1158,"name":"宁波市"},{"id":1273,"name":"衢州市"},{"id":1280,"name":"丽水市"},{"id":1290,"name":"台州市"},{"id":1298,"name":"舟山市"},{"id":1213,"name":"杭州市"},{"id":1233,"name":"温州市"},{"id":1243,"name":"嘉兴市"},{"id":1250,"name":"湖州市"},{"id":1255,"name":"绍兴市"},{"id":1262,"name":"金华市"}],"16":[{"id":1303,"name":"福州市"},{"id":1315,"name":"厦门市"},{"id":1317,"name":"三明市"},{"id":1329,"name":"莆田市"},{"id":1332,"name":"泉州市"},{"id":1341,"name":"漳州市"},{"id":1352,"name":"南平市"},{"id":1362,"name":"龙岩市"},{"id":1370,"name":"宁德市"}],"17":[{"id":1432,"name":"孝感市"},{"id":1441,"name":"黄冈市"},{"id":1458,"name":"咸宁市"},{"id":1466,"name":"恩施州"},{"id":1475,"name":"鄂州市"},{"id":1477,"name":"荆门市"},{"id":1479,"name":"随州市"},{"id":3154,"name":"神农架林区"},{"id":1381,"name":"武汉市"},{"id":1387,"name":"黄石市"},{"id":1396,"name":"襄阳市"},{"id":1405,"name":"十堰市"},{"id":1413,"name":"荆州市"},{"id":1421,"name":"宜昌市"},{"id":2922,"name":"潜江市"},{"id":2980,"name":"天门市"},{"id":2983,"name":"仙桃市"}],"18":[{"id":1482,"name":"长沙市"},{"id":1488,"name":"株洲市"},{"id":1495,"name":"湘潭市"},{"id":1499,"name":"韶山市"},{"id":1501,"name":"衡阳市"},{"id":1511,"name":"邵阳市"},{"id":1522,"name":"岳阳市"},{"id":1530,"name":"常德市"},{"id":1540,"name":"张家界市"},{"id":1544,"name":"郴州市"},{"id":1555,"name":"益阳市"},{"id":1560,"name":"永州市"},{"id":1574,"name":"怀化市"},{"id":1586,"name":"娄底市"},{"id":1592,"name":"湘西州"}],"19":[{"id":1601,"name":"广州市"},{"id":1607,"name":"深圳市"},{"id":1609,"name":"珠海市"},{"id":1611,"name":"汕头市"},{"id":1617,"name":"韶关市"},{"id":1627,"name":"河源市"},{"id":1634,"name":"梅州市"},{"id":1709,"name":"揭阳市"},{"id":1643,"name":"惠州市"},{"id":1650,"name":"汕尾市"},{"id":1655,"name":"东莞市"},{"id":1657,"name":"中山市"},{"id":1659,"name":"江门市"},{"id":1666,"name":"佛山市"},{"id":1672,"name":"阳江市"},{"id":1677,"name":"湛江市"},{"id":1684,"name":"茂名市"},{"id":1690,"name":"肇庆市"},{"id":1698,"name":"云浮市"},{"id":1704,"name":"清远市"},{"id":1705,"name":"潮州市"}],"20":[{"id":3168,"name":"崇左市"},{"id":1715,"name":"南宁市"},{"id":1720,"name":"柳州市"},{"id":1726,"name":"桂林市"},{"id":1740,"name":"梧州市"},{"id":1746,"name":"北海市"},{"id":1749,"name":"防城港市"},{"id":1753,"name":"钦州市"},{"id":1757,"name":"贵港市"},{"id":1761,"name":"玉林市"},{"id":1792,"name":"贺州市"},{"id":1806,"name":"百色市"},{"id":1818,"name":"河池市"},{"id":3044,"name":"来宾市"}],"21":[{"id":1827,"name":"南昌市"},{"id":1832,"name":"景德镇市"},{"id":1836,"name":"萍乡市"},{"id":1842,"name":"新余市"},{"id":1845,"name":"九江市"},{"id":1857,"name":"鹰潭市"},{"id":1861,"name":"上饶市"},{"id":1874,"name":"宜春市"},{"id":1885,"name":"抚州市"},{"id":1898,"name":"吉安市"},{"id":1911,"name":"赣州市"}],"22":[{"id":2103,"name":"凉山州"},{"id":1930,"name":"成都市"},{"id":1946,"name":"自贡市"},{"id":1950,"name":"攀枝花市"},{"id":1954,"name":"泸州市"},{"id":1960,"name":"绵阳市"},{"id":1962,"name":"德阳市"},{"id":1977,"name":"广元市"},{"id":1983,"name":"遂宁市"},{"id":1988,"name":"内江市"},{"id":1993,"name":"乐山市"},{"id":2005,"name":"宜宾市"},{"id":2016,"name":"广安市"},{"id":2022,"name":"南充市"},{"id":2033,"name":"达州市"},{"id":2042,"name":"巴中市"},{"id":2047,"name":"雅安市"},{"id":2058,"name":"眉山市"},{"id":2065,"name":"资阳市"},{"id":2070,"name":"阿坝州"},{"id":2084,"name":"甘孜州"}],"23":[{"id":3690,"name":"三亚市"},{"id":3698,"name":"文昌市"},{"id":3699,"name":"五指山市"},{"id":3701,"name":"临高县"},{"id":3702,"name":"澄迈县"},{"id":3703,"name":"定安县"},{"id":3704,"name":"屯昌县"},{"id":3705,"name":"昌江县"},{"id":3706,"name":"白沙县"},{"id":3707,"name":"琼中县"},{"id":3708,"name":"陵水县"},{"id":3709,"name":"保亭县"},{"id":3710,"name":"乐东县"},{"id":3711,"name":"三沙市"},{"id":2121,"name":"海口市"},{"id":3115,"name":"琼海市"},{"id":3137,"name":"万宁市"},{"id":3173,"name":"东方市"},{"id":3034,"name":"儋州市"}],"24":[{"id":2144,"name":"贵阳市"},{"id":2150,"name":"六盘水市"},{"id":2155,"name":"遵义市"},{"id":2169,"name":"铜仁市"},{"id":2180,"name":"毕节市"},{"id":2189,"name":"安顺市"},{"id":2196,"name":"黔西南州"},{"id":2205,"name":"黔东南州"},{"id":2222,"name":"黔南州"}],"25":[{"id":4108,"name":"迪庆州"},{"id":2235,"name":"昆明市"},{"id":2247,"name":"曲靖市"},{"id":2258,"name":"玉溪市"},{"id":2270,"name":"昭通市"},{"id":2281,"name":"普洱市"},{"id":2291,"name":"临沧市"},{"id":2298,"name":"保山市"},{"id":2304,"name":"丽江市"},{"id":2309,"name":"文山州"},{"id":2318,"name":"红河州"},{"id":2332,"name":"西双版纳州"},{"id":2336,"name":"楚雄州"},{"id":2347,"name":"大理州"},{"id":2360,"name":"德宏州"},{"id":2366,"name":"怒江州"}],"26":[{"id":3970,"name":"阿里地区"},{"id":3971,"name":"林芝地区"},{"id":2951,"name":"拉萨市"},{"id":3107,"name":"那曲地区"},{"id":3129,"name":"山南地区"},{"id":3138,"name":"昌都地区"},{"id":3144,"name":"日喀则地区"}],"27":[{"id":2428,"name":"延安市"},{"id":2442,"name":"汉中市"},{"id":2454,"name":"榆林市"},{"id":2468,"name":"商洛市"},{"id":2476,"name":"安康市"},{"id":2376,"name":"西安市"},{"id":2386,"name":"铜川市"},{"id":2390,"name":"宝鸡市"},{"id":2402,"name":"咸阳市"},{"id":2416,"name":"渭南市"}],"28":[{"id":2525,"name":"庆阳市"},{"id":2534,"name":"陇南市"},{"id":2544,"name":"武威市"},{"id":2549,"name":"张掖市"},{"id":2556,"name":"酒泉市"},{"id":2564,"name":"甘南州"},{"id":2573,"name":"临夏州"},{"id":3080,"name":"定西市"},{"id":2487,"name":"兰州市"},{"id":2492,"name":"金昌市"},{"id":2495,"name":"白银市"},{"id":2501,"name":"天水市"},{"id":2509,"name":"嘉峪关市"},{"id":2518,"name":"平凉市"}],"29":[{"id":2580,"name":"西宁市"},{"id":2585,"name":"海东地区"},{"id":2592,"name":"海北州"},{"id":2597,"name":"黄南州"},{"id":2603,"name":"海南州"},{"id":2605,"name":"果洛州"},{"id":2612,"name":"玉树州"},{"id":2620,"name":"海西州"}],"30":[{"id":2628,"name":"银川市"},{"id":2632,"name":"石嘴山市"},{"id":2637,"name":"吴忠市"},{"id":2644,"name":"固原市"},{"id":3071,"name":"中卫市"}],"31":[{"id":4110,"name":"五家渠市"},{"id":4163,"name":"博尔塔拉蒙古自治州阿拉山口口岸"},{"id":15945,"name":"阿拉尔市"},{"id":15946,"name":"图木舒克市"},{"id":2652,"name":"乌鲁木齐市"},{"id":2654,"name":"克拉玛依市"},{"id":2656,"name":"石河子市"},{"id":2658,"name":"吐鲁番地区"},{"id":2662,"name":"哈密地区"},{"id":2666,"name":"和田地区"},{"id":2675,"name":"阿克苏地区"},{"id":2686,"name":"喀什地区"},{"id":2699,"name":"克孜勒苏州"},{"id":2704,"name":"巴音郭楞州"},{"id":2714,"name":"昌吉州"},{"id":2723,"name":"博尔塔拉州"},{"id":2727,"name":"伊犁州"},{"id":2736,"name":"塔城地区"},{"id":2744,"name":"阿勒泰地区"}],"32":[{"id":2768,"name":"台湾市"}],"42":[{"id":2754,"name":"香港特别行政区"}],"43":[{"id":2770,"name":"澳门市"}],"84":[{"id":1310,"name":"钓鱼岛"}]};
//区域-市对应第一个县级地址ID
var cityAreaJson = {"2802":"2821","72":"2799","2801":"2827","2804":"2828","2800":"2848","2803":"2829","2805":"2832","2807":"51552","2809":"51216","2806":"2831","2953":"2954","2816":"2862","2810":"4194","2814":"2847","3065":"51505","2901":"2906","2817":"2873","2813":"2863","2815":"2870","2820":"2879","2822":"2856","2823":"2884","2824":"51911","2825":"2892","2833":"2869","2826":"2864","2834":"2866","2835":"2868","2837":"2888","2841":"2876","2919":"50779","51036":"2984","78":"79","51037":"2987","51038":"3000","51035":"39620","51039":"2985","51041":"98","51042":"36157","51044":"25708","51040":"2986","51043":"2907","51045":"25711","51046":"22846","51051":"22848","51048":"23672","51047":"25704","51049":"8545","51052":"23674","51050":"6646","123":"9754","48132":"48163","48203":"48237","48206":"48277","50950":"88","50951":"4298","48131":"48185","50953":"50979","50952":"106","50954":"111","51026":"103","51027":"50956","51028":"50955","142":"143","148":"167","224":"225","164":"183","258":"2756","239":"241","274":"284","248":"261","275":"291","264":"265","2808":"51528","309":"310","318":"319","303":"304","330":"331","2812":"51125","336":"338","325":"326","350":"351","368":"369","379":"380","398":"399","412":"415","3074":"3075","438":"439","427":"428","420":"421","454":"455","468":"469","446":"447","458":"459","475":"476","482":"483","489":"490","495":"496","502":"503","517":"518","538":"540","549":"551","2780":"35173","560":"567","573":"574","527":"529","2830":"51800","579":"580","584":"585","589":"591","593":"596","604":"606","598":"599","609":"610","632":"633","617":"618","621":"623","613":"614","639":"640","6858":"6859","2992":"2993","644":"645","651":"652","657":"658","674":"675","664":"665","681":"682","687":"3312","727":"728","731":"733","742":"744","737":"739","753":"754","773":"774","765":"766","757":"758","793":"794","776":"777","698":"699","782":"784","712":"713","805":"807","799":"801","810":"811","835":"836","812":"814","823":"824","870":"871","848":"849","891":"892","880":"881","895":"896","902":"3142","925":"926","911":"914","919":"920","904":"905","933":"934","951":"955","113":"9775","965":"967","978":"980","114":"9893","939":"940","972":"973","959":"960","115":"9938","119":"9970","988":"993","984":"3381","2900":"2908","126":"13518","1016":"1019","1000":"1002","131":"10377","128":"10002","1007":"1014","1025":"1026","1022":"3522","1032":"1033","129":"10032","1042":"1044","1053":"1054","1060":"1061","133":"10089","132":"9827","1081":"1082","1058":"1059","1072":"1073","1090":"1092","130":"10058","1151":"1153","1167":"1168","134":"10131","1099":"1101","1112":"3132","1108":"2934","135":"10158","136":"10187","1174":"1176","1180":"1181","1159":"1161","139":"10283","1206":"1207","1201":"1202","2971":"2972","137":"10213","138":"10244","140":"10307","1121":"1122","1116":"1119","1114":"19783","1127":"1128","1124":"19223","1132":"1133","141":"10346","1137":"1138","1140":"1141","1290":"1291","48133":"48134","48201":"48295","48202":"48351","1158":"1224","1280":"1281","1273":"1275","48204":"48209","1213":"1214","48205":"48325","1233":"1237","1298":"1300","1250":"1251","1255":"1257","48207":"48254","1243":"1244","1303":"1305","1317":"1319","1262":"1263","1332":"1334","1329":"1331","1315":"1316","1352":"1354","1341":"1343","1362":"1364","1370":"1372","1432":"1435","1441":"1444","1458":"1461","50995":"50996","1466":"1467","1475":"3601","3154":"23610","1479":"3163","1477":"1478","1387":"1389","1381":"1386","4164":"10406","1413":"1414","1405":"1406","1421":"1423","1396":"1397","199":"203","1488":"1489","1495":"1496","1482":"1485","1501":"1502","1522":"1523","1540":"1541","1499":"1500","1511":"1512","1530":"1532","1544":"1545","1555":"1556","1560":"1563","1574":"1575","1586":"1588","1592":"1593","1601":"3633","1607":"3155","1617":"1618","1609":"41653","1627":"1628","1611":"1614","1634":"1635","1709":"1712","1650":"1653","1643":"1647","1659":"37258","1684":"1687","1666":"1669","1672":"1673","1677":"1679","1698":"1700","1690":"1693","1704":"1795","3168":"3169","1715":"1716","1705":"1707","1726":"1727","1720":"1721","1740":"1741","1757":"1758","1746":"1747","1749":"1750","1761":"1762","1792":"1803","1753":"1754","3044":"3046","1806":"1807","1818":"1820","1832":"1833","1827":"1828","1836":"1837","1842":"1843","1857":"1858","1874":"1875","1845":"1846","1861":"1863","1885":"1887","1930":"4284","1911":"1912","1898":"1899","2103":"2105","1946":"1947","1954":"1955","1960":"1970","1950":"1951","1977":"1978","1962":"1965","1983":"1984","1988":"1989","2005":"2006","2022":"2028","2033":"2034","1993":"1994","2016":"2017","2047":"2049","2042":"2044","2070":"2071","2065":"2068","2084":"2085","2058":"2060","3690":"3693","3699":"3712","3701":"3790","3703":"3811","3706":"3834","3702":"3801","3707":"3878","3705":"3828","3704":"3820","3709":"3869","3708":"3858","3710":"3845","3711":"3887","3115":"3720","3137":"3768","2121":"22466","3173":"3780","2150":"2151","2155":"2156","2144":"2145","2169":"2170","2189":"2190","2196":"2197","2205":"2206","2180":"2182","4108":"6823","2222":"2223","2235":"2236","2258":"2259","2247":"2249","2270":"2271","2281":"2282","2291":"2292","2304":"2305","2309":"2310","2318":"2319","2298":"2299","2336":"2338","2332":"2333","2366":"2367","2347":"2349","2360":"2361","3970":"3972","3971":"3979","2951":"2952","3138":"3139","3107":"3108","3129":"3130","3144":"3160","2442":"2443","2428":"2429","2454":"2456","2386":"2387","2468":"2469","2476":"2478","2376":"2380","2390":"2392","2402":"2403","2525":"2526","2416":"2417","2534":"2535","2549":"2550","2544":"2545","2564":"2565","2573":"2574","3080":"3081","2556":"2558","2487":"2488","2492":"2493","2501":"2504","2518":"2519","2509":"2970","2580":"2581","2495":"2496","2585":"2586","2603":"4012","2592":"2593","2597":"2598","2605":"2606","2620":"2621","2612":"2613","2628":"2629","2632":"2633","4110":"4122","3071":"3072","2644":"2647","2637":"2638","15945":"15948","2654":"2655","2656":"2657","15946":"15947","2652":"2653","2662":"2663","2658":"2659","2666":"2667","2675":"2676","2699":"2700","2686":"2687","2727":"2728","2714":"2715","2704":"2705","2736":"2737","2723":"2724","2744":"2745","2754":"2755","2768":"2769","2770":"2771","2922":"23585","2980":"23618","2983":"23646","1655":"2950","1657":"2777","3698":"3752","3034":"3125"};
//默认区域
var currentLocation = "北京";

//商品有效期
//var rmsurl="//rms.shop.jd.com";
//运费
//var dcashurl="//yfei.shop.jd.com/json/pop/fare.action";

//上下柜状态 state:0、1、2、10；0:下柜，1：上柜，2：预发布，10：pop删除
//无货推荐？
if(pageConfig.product.warestatus != 1 && pageConfig.product.warestatus != 2) {
    $("#product-intro").addClass('product-intro-itemover');
    $('#noitem-related-list').remove();
}
$.pbuyurl="";
$.haveShow=0;
$._ptload=false;
$._ptloadcon="";
$.divide_button=$("#choose-btn-divide");
$.notice_button=$("#choose-btn-notice");
$.append_button=pageConfig.M_addToCart.$el;
$.getShopUrl=function(r){if(r.url)return r.url;return "//mall.jd.com/index-"+r.id+".html";};

function checkApecialAttr(attr){
    if(pageConfig.product.specialAttrs&&pageConfig.product.specialAttrs.length>0){
        for(var i=0,j=pageConfig.product.specialAttrs.length;i<j;i++){
            if(attr==pageConfig.product.specialAttrs[i]){
                return true;
            }
        }
    }
    return false;
}
pageConfig.product.isLOC2=checkApecialAttr("isLOC-2");
pageConfig.product.isLOC=checkApecialAttr("isLOC")||pageConfig.product.isLOC2;
pageConfig.product.isLSP=checkApecialAttr("isLSP");
pageConfig.product.hideStock=checkApecialAttr('YuShou')||checkApecialAttr('YuShouNoWay');
//loc
var locSkuEndDate = null;
function getLocSkuDateCallBack(r){
    if(r&&r.expiryEndDate){
        var d = new Date(r.expiryEndDate);
        var y = d.getFullYear();
        var m = d.getMonth()+1;m = (m<10?"0":"")+m;
        var dd = d.getDate();dd = (dd<10?"0":"")+dd;
        var h = d.getHours();h = (h<10?"0":"")+h;
        var mi  = d.getMinutes();mi = (mi<10?"0":"")+mi;
        var s = d.getSeconds();s = (s<10?"0":"")+s;
        locSkuEndDate = "有效期至 "+y+"-"+m+"-"+dd;
        if($("#loc_enddate").length>0){$("#loc_enddate").html(locSkuEndDate);}
    }
}
function getLocSkuDate(){
    //$.ajax({
    //    url: rmsurl+"/json/locWare/getLocWareBySkuId.action?skuId="+pageConfig.product.skuid+"&t="+new Date().getTime(),
    //    dataType: 'jsonp',
    //    jsonpCallback: 'getLocSkuDateCallBack',
    //    cache: true
    //});
}
if(pageConfig.product.isLOC){getLocSkuDate();}

/***********icon start***********/
var requestDeliveCash = false;
var areaSurportDelive = true;
pageConfig.product.isOverseaPurchase=checkApecialAttr("isOverseaPurchase-2")||checkApecialAttr("isOverseaPurchase-1")||checkApecialAttr("isEbay-2")||checkApecialAttr("isEbay-1");
function getDeliveCash(r){
    var dcash = [],dcashPayOnline = "",dcashPayArrive = "",noDcashPayOnline=false,noDcashPayArrive=false,dcashPayPro="";
    if(r&&r.dtype==undefined){
        for(var i=0,j=r.length;i<j;i++){
            if (r[i].freihtType==1){
                if(r[i].dtype == 0){
                    if(new Number(r[i].dcash)>0){
                        dcash.push("运费"+r[i].dcash+"元");
                    }
                    else{
                        dcash.push("免运费");
                    }
                }
                else if(r[i].dtype == 1&&new Number(r[i].dcash)>0&&new Number(r[i].ordermin)>0){
                    dcash.push("店铺单笔订单不满"+r[i].ordermin+"元，收运费"+r[i].dcash+"元");
                }
                else if(r[i].dtype == 2){
                    if(new Number(r[i].dcash)>0){
                        if(new Number(r[i].ordermin)>0){
                            dcashPayOnline = "在线支付运费"+r[i].dcash+"元";
                            if(!dcashPayPro){
                                dcashPayPro = "店铺单笔订单不满"+r[i].ordermin+"元";
                            }
                        }
                        else{
                            dcashPayOnline = "在线支付运费"+r[i].dcash+"元";
                        }
                    }
                    else if(!pageConfig.product.isOverseaPurchase){
                        dcashPayOnline = "在线支付免运费";
                        noDcashPayOnline = true;
                    }
                }
                else if(pageConfig.product.suportPayment && r[i].dtype == 3){
                    if(new Number(r[i].dcash)>0){
                        if(new Number(r[i].ordermin)>0){
                            dcashPayArrive = "货到付款运费"+r[i].dcash+"元";
                            if(!dcashPayPro){
                                dcashPayPro = "店铺单笔订单不满"+r[i].ordermin+"元";
                            }
                        }
                        else{
                            dcashPayArrive = "货到付款运费"+r[i].dcash+"元";
                        }
                    }
                    else{
                        dcashPayArrive = "货到付款免运费";
                        noDcashPayArrive = true;
                    }
                }
            }
        }
    }
    if(dcashPayArrive||dcashPayOnline){
        dcash = [];
        if(dcashPayArrive){
            dcash.push(dcashPayArrive);
        }
        if(dcashPayOnline){
            dcash.push(dcashPayOnline);
        }
    }
    if(noDcashPayOnline&&noDcashPayArrive){
        dcash = [];
        dcash.push("免运费");
    }
    if(dcash.length>0){
        $("#store-prompt .charges").html((dcashPayPro?dcashPayPro+"，":dcashPayPro)+dcash.join("，")+"<a title='了解配送费收取标准' style='position: relative;' href='//help.jd.com/help/question-892.html#help2215' class='free_delivery_policy' target='_blank'>&nbsp;</a>");
    }
}
function getPOPDeliveCash(){
    //if (requestDeliveCash){
    //    $.ajax({
    //        url: dcashurl+"?venderId="+pageConfig.product.venderId+"&skuId="+pageConfig.product.skuid+"&provinceId="+currentAreaInfo.currentProvinceId+"&cityId="+currentAreaInfo.currentCityId+"&buyNum="+$("#buy-num").val()+"&vType="+(pageConfig.product.isLSP?2:1),
    //        dataType: 'jsonp',
    //        jsonpCallback: 'getDeliveCash',
    //        cache: true
    //    });
    //}
}
pageConfig.product.pvstock={webstate:1,delivestate:5,stock:33};
function pvstocklog1(price){
    price = parseFloat(price);
    if(isNaN(price))price=-1;
    var data = {"area":[currentAreaInfo.currentProvinceId,currentAreaInfo.currentCityId,currentAreaInfo.currentAreaId,currentAreaInfo.currentTownId].join('_'),"sku":[[pageConfig.product.skuid,price,pageConfig.product.pvstock.webstate,pageConfig.product.pvstock.delivestate,pageConfig.product.pvstock.stock]]};
    if ( typeof logJSON === 'function' ) {
        logJSON('pv_stock','sku',data);
    }
}
function pvstocklog(){
    var price=$('#jd-price').html().replace('￥','');
    if (price){
        pvstocklog1(price);
    }else{
        $.ajax({
            url: "//p.3.cn/prices/get?skuid=J_"+pageConfig.product.skuid+"&type=1&area="+[currentAreaInfo.currentProvinceId,currentAreaInfo.currentCityId,currentAreaInfo.currentAreaId,currentAreaInfo.currentTownId].join('_'),
            dataType: 'jsonp',
            success:function(r){
                pvstocklog1(r[0].p);
            }
        });
    }
}
function getDataShowList(p){
    if(pageConfig.product.warestatus!=1){p.StockState=0;}
    var state = p.code==2?-1:p.StockState;
    //突出服务支持
    var spIconJson = {};
    pageConfig.product.spIconDesc = "";
    pageConfig.product.suportPayment = false;
    if (pageConfig.promiseIcon == 'enable'&&p.eir&&p.eir.length>0){
        for (var i=0,j=p.eir.length;i<j;i++){
            if (p.eir[i].resultCode==1){
                if(p.eir[i].showName&&p.eir[i].showName.indexOf("货到付款")>-1){pageConfig.product.suportPayment=true;}
                spIconJson[p.eir[i].iconCode] = 1;
                if(!p.eir[i].helpLink){p.eir[i].helpLink="#"}
                pageConfig.product.spIconDesc += (i==0?'':'&nbsp;&nbsp;|&nbsp;&nbsp;')+'<a href="'+p.eir[i].helpLink+'" '+(p.eir[i].helpLink=='#'?'':'target="_blank"')+' title="'+p.eir[i].iconTip+'">'+p.eir[i].iconSrc+'</a>';
            }
        }
    }
    //服务支持
    pageConfig.product.iconDesc = "";
    var nsngICON = '<dd><a href="//smarthome.jd.com/" target="_blank" class="jd-support-ico" clstag="shangpin|keycount|product|fuwuzhichi_微联超级智能 title="微联超级App提供不同品牌间智能产品的远程操控和互联"><img src="//img30.360buyimg.com/da/jfs/t1360/71/1040618102/9410/a5d6295/55b98522Nbefadd80.png">微联超级智能</a></dd>';

    if ( checkApecialAttr('isNSNGgoods-3') || /nsng/.test(location.href) ) {
        pageConfig.product.iconDesc += nsngICON;
    }
    if (pageConfig.promiseIcon == 'enable'&&p.ir&&p.ir.length>0){
        for (var i=0,j=p.ir.length;i<j;i++){
            if (p.ir[i].resultCode==1 && !spIconJson[p.ir[i].iconCode]){
                if(!p.ir[i].helpLink){p.ir[i].helpLink="#"}
                if(p.ir[i].showName&&p.ir[i].picUrl){
                    pageConfig.product.iconDesc += '<dd><a href="'+p.ir[i].helpLink+'" '+(p.ir[i].helpLink=='#'?'':'target="_blank"')+' class="jd-support-ico" clstag="shangpin|keycount|product|fuwuzhichi_'+p.ir[i].showName+'" title="'+p.ir[i].iconTip+'"><img src="'+p.ir[i].picUrl+'"/>'+p.ir[i].showName+'</a></dd>';
                }
            }
        }
    }
    //发货、售后、配送、发货地
    pageConfig.product.serviceInfo = "";
    if(!G.isPop){
        if (checkApecialAttr('isBroadband')) {
            pageConfig.product.serviceInfo = "由当地运营商联系用户确认预约信息，并提供上门安装、收费及售后服务。";
        } else if (p.PopType==999|| (p.Ext && p.Ext.indexOf("factoryShip")!=-1)){
            pageConfig.product.serviceInfo = "由厂家或供应商提供和配送。";
        }else{
            if(p.self_D&&p.self_D.po=="true"){
                pageConfig.product.serviceInfo = "由 京东 发货,<a href='"+p.self_D.url+"' clstag='shangpin|keycount|product|bbtn' class='hl_red'>"+p.self_D.vender+"</a>提供售后服务。";
            }
            else{
                pageConfig.product.serviceInfo = "由 京东 发货并提供售后服务。";
            }
        }
    }
    else{
        var r = p.D;
        if(r){
            var key=r.id+"_"+r.type;
            //发货地
            var dfinfo=(r.vid.length!=7&&r.df&&r.df!="null")?("从 "+r.df+" "):"负责";
            //谁提供售后（po是否自主售后）
            var shinfo=r.po=="false"?"京东提供售后服务。":"并提供售后服务。"; //sop & sopl
            if(r.type==0){ //SOP
                if(pageConfig.product.isLOC){
                    pageConfig.product.serviceInfo="由<a href='"+$.getShopUrl(r)+"' target='_blank' clstag='shangpin|keycount|product|bbtn' class='hl_red'>"+r.vender+"</a>提供服务和售后"
                    +"<span id='loc_enddate'>"+(locSkuEndDate?("，"+locSkuEndDate):"。")+"</span>";
                }
                else{
                    pageConfig.product.serviceInfo="由<a href='"+$.getShopUrl(r)+"' target='_blank' clstag='shangpin|keycount|product|bbtn' class='hl_red'>"+r.vender+"</a>"+dfinfo+"发货，"+shinfo;
                }
            }
            else if(r.type==1){ //FBP
                pageConfig.product.serviceInfo="由 京东 发货"+(r.po=="false"?"并提供售后服务。":(",<a href='"+$.getShopUrl(r)+"' clstag='shangpin|keycount|product|bbtn' class='hl_red'>"+r.vender+"</a>提供售后服务"));
            }
            else if(r.type==2){ //LBP
                pageConfig.product.serviceInfo="由<a href='"+$.getShopUrl(r)+"' clstag='shangpin|keycount|product|bbtn' class='hl_red'>"+r.vender+"</a>"+dfinfo+"发货，京东提供售后服务。";
            }
            else if(r.type==5){ //SOPL
                pageConfig.product.serviceInfo="由<a href='"+$.getShopUrl(r)+"' clstag='shangpin|keycount|product|bbtn' class='hl_red'>"+r.vender+"</a>"+dfinfo+"发货，"+shinfo;
            }
        }
    }
    //promise
    pageConfig.product.promiseResult = p.pr&&p.pr.resultCode==1&&p.pr.promiseResult?p.pr.promiseResult:"";
    pageConfig.product.serviceInfo += pageConfig.product.promiseResult;
    pageConfig.product.havestock = true;
    pageConfig.product.pvstock={webstate:1,delivestate:5,stock:33};
    //库存描述
    pageConfig.product.stockDesc = "<strong>有货</strong>";
    if (state == -1){
        areaSurportDelive = false;
        pageConfig.product.havestock = false;
        pageConfig.product.pvstock.delivestate = 6;
        $('body').addClass('no-stock');
        pageConfig.product.stockDesc = "<strong>该地区暂不支持配送</strong>";
    }
    else{
        pageConfig.product.pvstock.stock = state;
        areaSurportDelive = true;
        if (state == 33){
            pageConfig.product.havestock = true;
            pageConfig.product.pvstock.webstate = 1;
            pageConfig.product.stockDesc = "<strong>有货</strong>";
            if (p.rn&&p.rn>0){
                pageConfig.product.stockDesc += "，仅剩"+p.rn+"件";
            }
        }
        else if (state == 34 || state == 0){
            pageConfig.product.havestock = false;
            pageConfig.product.pvstock.webstate = 4;
            pageConfig.product.stockDesc = "<strong>无货</strong>，此商品暂时售完";
            if(G.isBook || G.isMvd){
                if(!p.IsPurchase){
                    pageConfig.product.stockDesc = "<strong>无货</strong>，此商品不再销售，欢迎选购其它商品";
                }
                else if(pageConfig.product.isNewBookDesc){
                    pageConfig.product.stockDesc = "<strong>无货</strong>，"+pageConfig.product.isNewBookDesc;
                    pageConfig.product.isNewBookDescState = "show";
                }
                else{
                    pageConfig.product.isNewBookDescState = "noshow";
                }
            }

        }
        else if (state == 39 || state == 40){
            pageConfig.product.havestock = true;
            pageConfig.product.pvstock.webstate = 2;
            var tempStr = "";
            if(state == 39){
                tempStr = "，下单后2-6天发货";
            }
            else if(state == 40 && !pageConfig.product.promiseResult){
                if((pageConfig.product.skuid+'').length==8){
                    if(p.Dti&&p.Dti.fastestDays&&p.Dti.slowestDays){
                        tempStr = "，下单后" + p.Dti.fastestDays + "-" + p.Dti.slowestDays + "天发货";
                    }
                    else if(p.rfg==2){
                        tempStr = "，预计下单后5-10天发货";
                    }
                }
                if(!tempStr){
                    tempStr = "，下单后2-6天发货";
                }
            }
            pageConfig.product.stockDesc = "<strong>有货</strong>"+tempStr+"<span></span>";
        }
        else if (state == 36){
            pageConfig.product.havestock = true;
            pageConfig.product.pvstock.webstate = 3;
            var tempStr = "，商品到货后发货，现在可下单";
            if(pageConfig.product.hideStock){
                tempStr = "";
            }
            else if(p.ArrivalDate && !pageConfig.product.promiseResult){
                tempStr = "，预计"+p.ArrivalDate+"日后有货，现在可下单";
            }
            else if((G.isBook || G.isMvd) && p.rfg == 2 && !pageConfig.product.promiseResult){
                tempStr = "，下单后7-9周发货";
            }
            pageConfig.product.stockDesc = "<strong>预订</strong>"+tempStr+"<span></span>";
        }
    }

    //特殊服务说明
    if(p.D&&p.D.prompt){
        var proarray=p.D.prompt.split("|");
        if(proarray[1]){
            pageConfig.product.serviceInfo +=(pageConfig.product.serviceInfo?"<br/>":"")+proarray[1];
        }
    }
    var venderid = p.D&&p.D.vid?p.D.vid:0;
    if (pageConfig.product.venderId!=venderid){
        pageConfig.product.venderId=venderid;
    }
    pageConfig.product.PianYuanYunFei="";
    if (!G.isPop){
        if(p.Ext&&p.Ext.indexOf("PianYuanYunFei")>-1){
            var cityIds={"15945":1,"15946":1,"2654":1,"2662":1,"2666":1,"2675":1,"2686":1,"2699":1,"2704":1,"2723":1,"2727":1,"2744":1,"2723":1};
            if((currentAreaInfo.currentProvinceId==26||(currentAreaInfo.currentProvinceId==31&&cityIds[currentAreaInfo.currentCityId+""]))&&(state>0&&state!=34)){
                pageConfig.product.PianYuanYunFei="<font title='钻石级别以上用户不用付运费' style='cursor:pointer'>单件运费：￥10.00，钻石、企业用户免收。</font>";
            }
        }
    }
    else{
        requestDeliveCash = true;
        getPOPDeliveCash();
    }
}
/***********icon end***********/
//Notify
function getBuyUrl(skuId){
    var count = $("#buy-num").val();
    if(!count) {
        count=1;
    }
    if(pageConfig.product.isLOC){
        return "//cart.jd.com/cart/dynamic/gateForSubFlow.action?wids="+skuId+"&nums="+count+"&subType=22";
    }

    if($.append_button.attr("href")!="#none") {
        return $.append_button.attr("href");
    }

    return "//cart.jd.com/gate.action?pid="+skuId+"&pcount="+count+"&ptype=1";
}
function chooseType() {
    var shoppingselect = $('#choose-type .item'),
        amount = $('#choose-amount'),
        buyLink = $('#InitCartUrl'),
        selectItem = $('#choose-type .selected').eq(0);
    if ( !selectItem.attr('data') ) {
        return false;
    }
    if ( shoppingselect.length > 0 ) {
        amount.hide();
    }
    shoppingselect.bind('click', function (i) {
        if ( $('#choose-btn-append').hasClass('disabled') ) {
            return false;
        }
        var data = $(this).attr('data').split('|'),
            link = buyLink.attr( 'href' );
        var newlink = data[1].replace(/wid=\d{6,}/, 'wid=' + pageConfig.product.skuid );
        shoppingselect.removeClass('selected');
        $(this).addClass('selected');
        $('#choose .result').html(data[0]);
        amount.addClass(data[2]);
        buyLink.attr('href', newlink);
    });
    if ( selectItem.length > 0 ) {
        var data = selectItem.attr('data').split('|'),
            newlink = data[1].replace(/wid=\d{6,}/, 'wid=' + pageConfig.product.skuid );
        buyLink.attr('href', newlink);
    }
    if ( shoppingselect.length == 1 && selectItem.length < 1 ) {
        shoppingselect.addClass('selected');
        buyLink.attr( 'href', shoppingselect.attr('data').split('|')[1].replace(/wid=\d{6,}/, 'wid=' + pageConfig.product.skuid ) );
    }
}
var choose_btn_gift = null;

function setGiftTips (isGift, areaText) {
    if(checkApecialAttr("isSupportCard")){
        var giftTipsHtml = (areaText || '北京地区') + '支持礼品包装' + '<a href="//cart.gift.jd.com/cart/addGiftToCart.action?pid='+pageConfig.product.skuid+'&pcount=1&ptype=1" target="_blank">&nbsp;&nbsp;详情 <s class="s-arrow">&gt;&gt;</s></a>';
        if (isGift) {
            pageConfig.Tip.set(0, giftTipsHtml);
        }
    }
}

/**
 服饰内衣：1315
 鞋靴：11729
 珠宝首饰：6144
 厨具：6196
 玩具乐器：6233
 药品：6321
 宠物：6994
 礼品箱包：1672
 运动户外：1318
 营养保健：9192
 家具家装：9570
 家具：9847
 家装建材：9855
 整车：12379
 */
var showNoticeWhenNoStockSupportedCat0 = {"1315" : 1, "11729" : 1, "6144" : 1, "6196" : 1, "6233" : 1, "6321" : 1, "6994" : 1, "1672" : 1, "1318" : 1, "9192" : 1, "9570" : 1, "9847" : 1, "9855" : 1, "12379" : 1};
function showNoticeWhenNoStock() {
    var skuid = pageConfig.product.skuid;
    var cat0 = pageConfig.product.cat[0] + ""; //一级分类
    var cat2 = pageConfig.product.cat[2] + ""; //三级分类
    var isPop = G.isPop;

    if(skuid <=0 ) {
        return false;
    }

    if(skuid == 1292571 || skuid == 1292564 || skuid == 1292563 || skuid == 938747 || skuid == 938749 ) { //礼品购不显示到货通知
        return false;
    }
    //12360 选号中心 不支持
    if(cat2 == 12360) {
        return false;
    }

    if(!areaSurportDelive) {//此区域不支持配送 无到货通知
        return false;
    }

    //pop的特殊分类支持到货通知
    if(isPop && showNoticeWhenNoStockSupportedCat0[cat0]) {
        return true;
    }

    //自营的支持到货通知
    return !isPop;
}
function SetNotifyByNoneStock(stockstatus,ext) {
    if (!choose_btn_gift||choose_btn_gift.length==0){
        choose_btn_gift = $("#choose-btn-gift .btn-gift");
    }
    pageConfig.product.YuShou=false;
    if (stockstatus!=34&&stockstatus!=0&&pageConfig.product.warestatus==1&&pageConfig.product.skuid!=938747&&pageConfig.product.skuid!=938749&&pageConfig.product.skuid!=1292571&&pageConfig.product.skuid!=1292564&&pageConfig.product.skuid!=1292563){
        pageConfig.product.isStock=true;
        //$("#choose-btn-append,#choose-btn-gift").removeClass("disabled");
        if(choose_btn_gift.attr("href")=="#none"&&choose_btn_gift.attr("href1"))choose_btn_gift.attr("href",choose_btn_gift.attr("href1"));
        if($("#choose-btn-subsidy .btn-subsidies").length>0){$("#choose-btn-append").addClass("choose-btn-append-lite");}
        $("#product-intro").removeClass('product-intro-itemover product-intro-noitem');
        $('#noitem-related-list').remove();
        pageConfig.M_easyBtn.show();
        $.divide_button.show();
        if(!G.isPop){$.notice_button.hide()}
        if($.append_button.length>0){
            if( $('#choose-type .item').length>0){
                $.append_button.attr("onclick","").attr("title","").unbind("click").click(function() {  mark(pageConfig.product.skuid, 2) }); //购物车
            }
            else{
                //pageConfig.BuyBtn.setEnabled(getBuyUrl(pageConfig.product.skuid));
                pageConfig.M_addToCart.enabled(getBuyUrl(pageConfig.product.skuid));
            }
        }
        if($(".nav-minicart-btn").length>0)$(".nav-minicart-btn").show(); //mini购物车
        $("#choose-btn-subsidy").show();
        if ((ext&&ext.indexOf("YuShou")>-1)||checkApecialAttr('YuShou')||checkApecialAttr("isKO")){
            pageConfig.product.YuShou=true;
            if(!window.Qiang){
                seajs.use('APP_ROOT/js/qiang');
            }
            //if(pageConfig.product.cat[2] !== 655 || $("#choose-type .selected").attr("data-id")=="100") {
            //    pageConfig.M_addToCart.hide();
            //    pageConfig.M_easyBtn.hide();
            //    $.divide_button.hide();
            //}
        }
        else if(ext&&ext.indexOf("is3GRealName")>-1){
            var newUrl = "//eve.jd.com/redirect.action?wid="+pageConfig.product.skuid+"&btype=16&pid="+currentAreaInfo.currentProvinceId+"&cid="+currentAreaInfo.currentCityId;
            //pageConfig.BuyBtn.setEnabled(newUrl);
            pageConfig.M_addToCart.enabled(newUrl);
        }
        return;
    }
    if(pageConfig&&pageConfig.product) {
        pageConfig.product.isStock=false;
    }

    $("#choose-btn-append,#choose-btn-gift").addClass("disabled").removeClass('choose-btn-append-lite');
    if(choose_btn_gift.attr("href"))choose_btn_gift.attr("href1",choose_btn_gift.attr("href")).attr("href","#none");
    // if(pageConfig.product.isLiuLiang&&$.append_button.attr("href")!="#none")pageConfig.product.href = $.append_button.attr("href");
    $("#product-intro").addClass('product-intro-noitem');
    pageConfig.M_easyBtn.hide();
    $.divide_button.hide();
    function getNoStockText() {
        return pageConfig.product.isClosePCShow ? '': '商品已无货';
    }
    if($.append_button.length>0){$.append_button.show();if($.append_button.attr("href")!="#none"){$.pbuyurl=$.append_button.attr("href")}$.append_button.attr("href","#none").attr("onclick","").attr("title",getNoStockText()).unbind("click"); }//购物车
    $("#choose-btn-subsidy").hide();

    $.notice_button = $("#choose-btn-notice");
    if(showNoticeWhenNoStock()){
        $.notice_button.show()
    } else {
        $.notice_button.hide()
    }
    if ((ext&&ext.indexOf("YuShou")>-1)||checkApecialAttr('YuShou')||checkApecialAttr("isKO")){
        pageConfig.product.YuShou=true;
        if(!window.Qiang){
            seajs.use('APP_ROOT/js/qiang');
        }
        //if($("#choose-type .selected").attr("data-id")=="100")
        //if(pageConfig.product.cat[2] !== 655 || $("#choose-type .selected").attr("data-id")=="100") {
        //    pageConfig.M_addToCart.hide();
        //    pageConfig.M_easyBtn.hide();
        //    $.divide_button.hide();
        //}
    }
    // 触发地区变化事件
};
//stock callback
function cleanKuohao(str){
    if(str&&str.indexOf("(")>0){
        str = str.substring(0,str.indexOf("("));
    }
    if(str&&str.indexOf("（")>0){
        str = str.substring(0,str.indexOf("（"));
    }
    return str;
}
pageConfig.product.giftTipsPros={"1":"北京","3":"天津","5":"河北","6":"山西","13":"山东","19":"广东","16":"福建","20":"广西","22":"四川","4":"重庆","24":"贵州","25":"云南",
    "26":"西藏","23":"海南","7":"河南","17":"湖北","18":"湖南","21":"江西","8":"辽宁","10":"黑龙江","9":"吉林","11":"内蒙古","27":"陕西","28":"甘肃",
    "29":"青海","30":"宁夏","31":"新疆","12":"江苏","15":"浙江","14":"安徽","2":"上海"};

//关联板式  移到后端输出
//showPopTemplete=function(r){
//    if(r&&r.wareTemplateContent) { $('#J-detail-pop-tpl-top').append(r.wareTemplateContent).attr('clstag','shangpin|keycount|product|pop-glbs'); }
//    if(r&&r.wareTemplateBottomContent) { $('#J-detail-pop-tpl-bottom').append(r.wareTemplateBottomContent).attr('clstag','shangpin|keycount|product|pop-glbs'); }
//};
//if(G.isPop) {
//    $.ajax({
//        url: rmsurl+"/json/wareTemplate/queryWareTemplateContent.action?skuId="+pageConfig.product.skuid,
//        dataType: 'jsonp',
//        jsonp: 'jsoncallback',
//        jsonpCallback: 'showPopTemplete',
//        cache: true
//    });
//}

function getProvinceStockCallback(result,choosetype) {
    var setSer = false;
    if (currentPageLoad.notSet&&currentPageLoad.isLoad){
        setSer = true;
    }
    else if (!currentPageLoad.isLoad){
        setSer = true;
    }
    setCommonCookies(currentAreaInfo.currentProvinceId,currentLocation,currentAreaInfo.currentCityId,currentAreaInfo.currentAreaId,currentAreaInfo.currentTownId,setSer);
    if (pageConfig.product.isElc){
        if(chooseSkuToArea_new(result.stock)=='jump'){return;}
        if(pageConfig.product.warestatus!=1){
            result.stock.StockState = 0;
            result.stock.StockStateName = "无货";
        }
    }
    //变换sku需要变化广告词及相关信息
    if (currentPageLoad.isLoad){
        currentPageLoad.isLoad=false;
    }
    if (result.stock) {
        dCashDescInfo.loadStockCnt ++;
        if(result.stock.D&&result.stock.D.id){
            pageConfig.product.popInfo = result;
        }
        var address = currentAreaInfo.allAreaName?currentAreaInfo.allAreaName:(currentAreaInfo.currentProvinceName+currentAreaInfo.currentCityName+currentAreaInfo.currentAreaName+currentAreaInfo.currentTownName);
        $("#store-selector .text div").html(address).attr("title",address);
        getDataShowList(result.stock);
        $("#store-prompt").html(pageConfig.product.stockDesc+(pageConfig.product.spIconDesc?('，支持&nbsp;'+pageConfig.product.spIconDesc):'')+"<span class='charges'>"+(pageConfig.product.PianYuanYunFei?pageConfig.product.PianYuanYunFei:"")+"</span>");
        if (pageConfig.product.serviceInfo == "") {
            pageConfig.product.serviceInfo = "&nbsp;";
        }
        $("#summary-service .dd").html(pageConfig.product.serviceInfo);

        if(pageConfig.product.iconDesc){
            $("#product-intro .jd-service dd").remove();
            $(pageConfig.product.iconDesc).insertAfter(".jd-service dt");
            $("#product-intro .jd-service").show();
        }
        else{
            $("#product-intro .jd-service").hide();
        }
        setGiftTips(pageConfig.product.giftTipsPros[currentAreaInfo.currentProvinceId+""],pageConfig.product.giftTipsPros[currentAreaInfo.currentProvinceId+""]+"地区");

        SetNotifyByNoneStock(result.stock.StockState,result.stock.Ext);
        newEasyBuyInit();
        pvstocklog();
    }
}
/**
 新地址列表数据及时间绑定
 **/
function getAreaList(result,idName,level,ipLocArray){
    if (idName && level){
        $("#"+idName).html("");
        var html = ["<ul class='area-list'>"];
        var longhtml = [];
        var longerhtml = [];
        if (result&&result.length > 0){
            for (var i=0,j=result.length;i<j ;i++ ){
                result[i].name = result[i].name.replace(" ","");
                if(result[i].name.length > 12){
                    longerhtml.push("<li class='longer-area'><a href='#none' data-value='"+result[i].id+"'>"+result[i].name+"</a></li>");
                }
                else if(result[i].name.length > 5){
                    longhtml.push("<li class='long-area'><a href='#none' data-value='"+result[i].id+"'>"+result[i].name+"</a></li>");
                }
                else{
                    html.push("<li><a href='#none' data-value='"+result[i].id+"'>"+result[i].name+"</a></li>");
                }
            }
        }
        else{
            html.push("<li><a href='#none' data-value='"+currentAreaInfo.currentFid+"'> </a></li>");
        }
        html.push(longhtml.join(""));
        html.push(longerhtml.join(""));
        html.push("</ul>");
        $("#"+idName).html(html.join(""));
        $("#"+idName).find("a").click(function(){
            resetBindMouseEvent();
            var areaId = $(this).attr("data-value");
            var areaName = $(this).html();
            var level = $(this).parent().parent().parent().attr("data-area");
            JdStockTabs.eq(level).find("a").attr("title",areaName).find("em").html(areaName.length>6?areaName.substring(0,6):areaName);
            level = new Number(level)+1;
            if (level=="2"){
                currentAreaInfo.currentCityId = areaId;
                currentAreaInfo.currentCityName = areaName;
                currentAreaInfo.currentAreaId = 0;
                currentAreaInfo.currentAreaName = "";
                currentAreaInfo.currentTownId = 0;
                currentAreaInfo.currentTownName = "";
                currentAreaInfo.allAreaName=currentAreaInfo.currentProvinceName+currentAreaInfo.currentCityName+currentAreaInfo.currentAreaName+currentAreaInfo.currentTownName;
            }
            else if (level=="3"){
                //3级地址埋点
                $("#JD-stock").find('.mc[data-area="2"] ul').attr("clstag", "shangpin|keycount|product|sanjidizhi_" + G.pType);
                if (requestLevel == 4 && currentAreaInfo.currentAreaId != areaId){
                    requestLevel = 3;
                }
                currentAreaInfo.currentAreaId = areaId;
                currentAreaInfo.currentAreaName = areaName;
                currentAreaInfo.currentTownId = 0;
                currentAreaInfo.currentTownName = "";
                currentAreaInfo.allAreaName=currentAreaInfo.currentProvinceName+currentAreaInfo.currentCityName+currentAreaInfo.currentAreaName+currentAreaInfo.currentTownName;
            }
            else if (level=="4"){
                currentAreaInfo.currentTownId = areaId;
                currentAreaInfo.currentTownName = areaName;
                currentAreaInfo.allAreaName=currentAreaInfo.currentProvinceName+currentAreaInfo.currentCityName+currentAreaInfo.currentAreaName+currentAreaInfo.currentTownName;
            }
            currentLocation = currentAreaInfo.currentProvinceName;
            GetStockInfoOrNextAreas(currentAreaInfo.currentProvinceId,currentAreaInfo.currentCityId,currentAreaInfo.currentAreaId,currentAreaInfo.currentTownId,pageConfig.product.cat[2],level,null,ipLocArray);
        });
        //页面初次加载
        if (currentPageLoad.isLoad){
            var tempDom = $("#"+idName+" a[data-value='"+currentPageLoad.areaCookie[level-1]+"']");
            if (tempDom.length == 0){
                tempDom = $("#"+idName+" a").eq(0);
            }
            if(currentPageLoad.areaCookie&&currentPageLoad.areaCookie[level-1]&&currentPageLoad.areaCookie[level-1]>0&&tempDom.length>0){
                //本地cookie有该级地区ID
                tempDom.click();
            }
            else{
                $("#"+idName+" a:first").click();
            }
        }
    }
}
/**
 下级地址回调方法
 **/
function getAreaListcallback(result,ipLocArray){
    var level = currentAreaInfo.currentLevel;
    getAreaList(result,getIdNameByLevel(level),level,ipLocArray);
}
/**
 根据父地址及地址等级获取下级地址列表
 **/
function getChildAreaHtml(fid,level,ipLocArray){
    var idName = getIdNameByLevel(level);
    if (idName){
        $("#stock_province_item,#stock_city_item,#stock_area_item,#stock_town_item").hide();
        $("#"+idName).show().html("<div class='iloading'>正在加载中，请稍候...</div>");
        JdStockTabs.show().removeClass("curr").eq(level-1).addClass("curr").find("em").html("请选择");
        for (var i=level,j=JdStockTabs.length;i<j ;i++ ){
            JdStockTabs.eq(i).hide();
        }
        currentAreaInfo.currentLevel = level;
        if(level == 2 && provinceCityJson[fid+""]){
            getAreaListcallback(provinceCityJson[fid+""],ipLocArray);
        }
        else{
            currentAreaInfo.currentFid = fid;
            currentAreaInfo.cityFirArea = cityAreaJson[fid+""];
            if(ipLocArray){
                $.ajax({
                    url: "//d.jd.com/area/get?fid="+fid,
                    dataType: 'jsonp',
                    jsonpCallback: 'getAreaListcallback',
                    cache: true,
                    timeout:4000,
                    error:function(){
                        getAreaListcallback([{"name":"","id":ipLocArray.length>2&&new Number(ipLocArray[2])>0?ipLocArray[2]:(currentAreaInfo.cityFirArea?currentAreaInfo.cityFirArea:fid)}]);
                    }
                });
            }
            else{
                $.ajax({
                    url: "//d.jd.com/area/get?fid="+fid,
                    dataType: 'jsonp',
                    jsonpCallback: 'getAreaListcallback',
                    cache: true
                });
            }
        }
    }
}
function getIdNameByLevel(level){
    var idName = "";
    if (level == 1){
        idName = "stock_province_item";
    }
    else if (level == 2){
        idName = "stock_city_item";
    }
    else if (level == 3){
        idName = "stock_area_item";
    }
    else if (level == 4){
        idName = "stock_town_item";
    }
    return idName;
}
//需要的地址层级
var requestLevel = 3;
//当前地域信息
var currentAreaInfo = null;
//初始化当前地域信息
function CurrentAreaInfoInit(){
    if(!currentAreaInfo) {
        currentAreaInfo = {
            "currentLevel": 1,
            "currentProvinceId": 1,
            "currentProvinceName": "北京",
            "currentCityId": 0,
            "currentCityName": "",
            "currentAreaId": 0,
            "currentAreaName": "",
            "currentTownId": 0,
            "currentTownName": ""
        };
    }
}
//回调方法
function getStockCallback_new(result,choosetype){
    if (result.stock&&(result.stock.code==3||result.stock.code==4)&&result.stock.level>1){
        //需要进一步计算，且需要地区层级大于1
        requestLevel = result.stock.level;
        if (currentAreaInfo.currentRequestLevel<result.stock.level){
            GetStockInfoOrNextAreas(currentAreaInfo.currentProvinceId,currentAreaInfo.currentCityId,currentAreaInfo.currentAreaId,currentAreaInfo.currentTownId,pageConfig .product.cat[2],currentAreaInfo.currentRequestLevel);
        }
    }
    else{
        reBindStockEvent();
        for (var i=currentAreaInfo.currentRequestLevel,j=JdStockTabs.length;i<j;i++){
            JdStockTabs.eq(i).hide();
            JdStockContents.eq(i).hide();
        }
        getProvinceStockCallback(result,choosetype);
        if(typeof choosetype=='undefined' || !choosetype){
            // 触发地区变化事件
            pageConfig.eventTarget.fire({
                type: 'onAreaChange',
                stock: result.stock&&(result.stock.StockState==34||result.stock.StockState==0)?'0':'1',
                delive: result.stock&&result.stock.code==2?'0':'1',
                area: [currentAreaInfo.currentProvinceId,currentAreaInfo.currentCityId,currentAreaInfo.currentAreaId]
            });
        }
    }


    var stock = result.stock;
    if(stock && stock.Dc) {
        //POP运费
        getDeliveCash(stock.Dc);
    }
    if(stock && stock.vd) {
        //本地生活商品有效期
        getLocSkuDateCallBack(stock.vd);
    }

    //POP预定商品配送时间
    if(stock && stock.StockState==36 && stock.Drd){
        var tmpHtml = $("#store-prompt .charges").html();
        $("#store-prompt").html("<strong>预订</strong>，"+"此商品为预订商品，下单后在"+stock.Drd+(pageConfig.product.spIconDesc?('<span class="payment">'+pageConfig.product.spIconDesc+'</span>'):'')
        +'<span class="charges">'+tmpHtml+'</span>');
    }

	if (result.choseSuit){
        var allSaleStop = true;
		for (var o in result.choseSuit){
			if (result.choseSuit[o].stock.skuState != 1){
				$("#choose-suit .item[data-sku='"+o+"']").hide();
			}
			else{
                allSaleStop = false;
				$("#choose-suit .item[data-sku='"+o+"']").show();
				if(result.choseSuit[o].stock.StockState == 0 || result.choseSuit[o].stock.StockState == 34){
					$("#choose-suit .item[data-sku='"+o+"']").find(".s-price").hide();
					$("#choose-suit .item[data-sku='"+o+"']").addClass("disabled").find(".lh").append("<div class='s-price' id='nostock-zt'>无货</div>");
				}
				else{
					$("#choose-suit .item[data-sku='"+o+"']").removeClass("disabled").find("#nostock-zt").remove();
					$("#choose-suit .item[data-sku='"+o+"']").find(".s-price").show();
				}
			}
		}
        if(allSaleStop) {
            $("#choose-suit").hide();
        }else {
            $("#choose-suit").show();
        }
	}

}
function getStockCallback(result){
    getStockCallback_new(result,false);
}
function getStockCallback1(result){
    getStockCallback_new(result,true);
}
function easybuysubmit(r){
    if(r&&r.success&&r.jumpUrl){
        window.location=r.jumpUrl;
    }
    else if(r&&!r.success&&r.message){
        seajs.use(['JDF_UI/dialog/1.0.0/dialog'],function(dialog){
            $('body').dialog({
                title:'提示',
                width: 400,
                height: 200,
                type:'text',
                source:r.message
            });
        });
        $("#btn-easybuy-submit").show();
        $("#btn-easybuy-submit-ing").hide();
    }
}
function checkLogin(cb) {
    if ( typeof cb !== 'function' ) { return; }
    $.ajax({
        url: '//passport.jd.com/loginservice.aspx?method=Login',
        dataType: 'jsonp',
        success: function(r) {
            if ( r.Identity ) {
                cb(r.Identity);
            }
        }
    });
}
/*前台逻辑
 有轻松购按钮（服务端判断）
 1.价格大于10
 2.非预售商品
 3.非655分类中的合约机*/
//seajs.use(['APP_ROOT/js/abtest', 'JDF_UNIT/insertStyles/1.0.0/insertStyles'], function (ABTest, insertStyles) {
//    var pin   = readCookie('pin');
//    var version = 'B';
//
//    insertStyles('#choose-btns div.choose-btn-onekeybuy b,\
//    #choose-btns div.choose-btn-onekeybuy a:hover b\
//    { background-position: -314px -169px }');
//
//    if (pin) {
//        pageConfig.easyBuyABTest = new ABTest(pin, 0.5);
//        version = pageConfig.easyBuyABTest.isHitVersion();
//    }
//
//    pageConfig.M_easyBtn.$el.attr('clstag', 'shangpin|keycount|product|easybuy_' + version);
//    if (version === 'A') {
//        pageConfig.M_easyBtn.$el.addClass('choose-btn-onekeybuy');
//    }
//});
function newEasyBuyInit(){
    if(dCashDescInfo.loadPriceCnt==dCashDescInfo.loadStockCnt){
        var hasEasyBuyBtn = pageConfig.M_easyBtn.$el.length > 0;
        var isNotYuShou = !pageConfig.product.YuShou;
        var isNotPhoneEasyBuy = !(pageConfig.product.cat[2] == 655 && pageConfig.product.isHeYue);
        if(
            hasEasyBuyBtn && itemEasyBuy.bigger10 && pageConfig.product.isStock && isNotYuShou && isNotPhoneEasyBuy) {
            checkLogin(function(r) {
                if(r&&r.IsAuthenticated) {
                    var easyBuyUrl = "//easybuy.jd.com/skuDetail/submitEasybuyOrder.action";
                    if(pageConfig.product.easyBuyUrl){
                        easyBuyUrl = pageConfig.product.easyBuyUrl;
                    }
                    pageConfig.M_easyBtn.$el.html("<a id='btn-easybuy-submit' class='btn-easybuy' href='#none'>轻松购<b></b></a>");
                    pageConfig.M_easyBtn.show();
                    $("#btn-easybuy-submit").click(function () {
                        $("#btn-easybuy-submit").hide().after("<a id='btn-easybuy-submit-ing' class='btn-easybuy css3-btn-gray' href='#none'>提交中<b></b></a>");
                        seajs.use('JDF_UNIT/login/1.0.0/login', function(login) {
                            login({
                                modal: true,
                                complete: function (result) {
                                    if (result != null &&result.Identity && result.Identity.IsAuthenticated) {
                                        $.ajax({
                                            url: easyBuyUrl +"?skuId="+pageConfig.product.skuid+"&num="+$("#buy-num").val(),
                                                dataType: 'jsonp',
                                            jsonpCallback: 'easybuysubmit'
                                        });
                                    }
                                    else{
                                        $("#btn-easybuy-submit").show();
                                        $("#btn-easybuy-submit-ing").hide();
                                    }
                                }
                            });
                        });
                    });
                }
                else{
                    $("#btn-easybuy-submit").remove();
                    $("#btn-easybuy-submit-ing").remove();
                }
            });
        }
        else{
            pageConfig.M_easyBtn.$el.html("");
            pageConfig.M_easyBtn.hide();
        }
    }
}

var dCashDescInfo={loadPriceCnt:0,loadStockCnt:0,bigger39:true,dCash:false};
var itemEasyBuy={bigger10:true};
//设置sku价格
function cnp(r){
    var price = "";
    dCashDescInfo.loadPriceCnt ++;
    if (r && r.length > 0) {
        var p = r[0].p;
        var m = r[0].m;
        var jp = new Number(p);
        var mp = new Number(m);
        pageConfig.product.jp = jp;
        pageConfig.product.mp = mp;
        if (jp > 0) {
            price = "￥" + p;
            var cat0 = pageConfig.product.cat[0];
            //服务端是否输出控制显示
            $("#summary-price .p-discount").html(G.discount(jp, mp));
            if(jp < 39) {
                dCashDescInfo.bigger39 = false;
            } else {
                dCashDescInfo.bigger39 = true;
            }
            if(jp < 10) {
                itemEasyBuy.bigger10 = false;
            } else {
                itemEasyBuy.bigger10 = true;
            }
            newEasyBuyInit();
        }
    }
    if(!price) {
        //没有价格不显示折扣和定价
        $("#summary-price").find(".p-discount, .pricing").hide();
    } else {
        $("#summary-price").find(".p-discount, .pricing").show();
        $("#page_maprice").html("￥" + m);
    }

    if (!price) {
        price = "暂无报价";
    }
    $("#summary-price .p-price, #mini-jd-price").html(price);

    // 触发价格加载完成事件
    pageConfig.eventTarget.fire({
        type: 'onPriceReady',
        price: r[0]
    });
}
function getUid() {
    var __jda = readCookie('__jda');
    var uid = '';

    if (__jda && __jda.indexOf('.') > -1) {
        uid = __jda.split('.')[1];
    }

    return uid;
}
function setPriceData(skuid,area) {
    $.ajax({
        url: "//p.3.cn/prices/get",
        data: {
            type: 1,
            area: area?area:"",
            pdtk: readCookie('pdtk') || '',
            pduid: getUid,
            pdpin: readCookie('pin') || '',
            pdbp: 0,
            skuid: 'J_'+(skuid?skuid:pageConfig.product.skuid)
        },
        dataType: 'jsonp',
        jsonpCallback: 'cnp',
        cache: true
    });
}
pageConfig.product.isElc = pageConfig.product.cat[1]==794||pageConfig.product.cat[2]==758||pageConfig.product.cat[2]==750;
function chooseSkuToArea_new(r){
    var locUrl = location.href.toLowerCase();
    if ( locUrl.indexOf('?jt=') > -1 ) {
        if (!pageConfig.product.firstJumpExcute){
            var matchedQueryString = locUrl.match(/jt=\w+/g);
            if ( matchedQueryString !== null ) {
                var jt = matchedQueryString[0].replace('jt=', '');
                var words="";
                if (jt=='10'){words="由于您选择的地区京东自营暂时无货或不支持配送，已为您切换为第三方商家的同款商品，请关注。";}
                else if (jt=='11'||jt=='00'){words="由于您地址的变更，已为您切换为在该地区售卖的同款商品，请关注。";}
                else if (jt=='01'){words="由于您选择的地区第三方商家暂时无货或不支持配送，已为您切换为京东自营同款商品，请关注。 ";}
                if(words){$("#name").before("<div id='jumpWords' style='color:#e3393c;font-size:12px;background: none repeat scroll 0 0 #f2f2f2;margin-top:2px;'><strong>"+words+"</strong><div>");}
            }
            pageConfig.product.firstJumpExcute = true;
        }
        else{
            $("#jumpWords").remove();
        }
    }
    var currentSkuId = pageConfig.product.skuid;

    if (r.realSkuId && currentSkuId != r.realSkuId){
        window.location="//item.jd.com/"+r.realSkuId+".html?jt="+ [G.isPop ? '0':'1', G.isPop ? '0':'1'].join('');
        return 'jump';
    }
    //设定该商品上下柜状态
    if(r.skuState != undefined) {
        pageConfig.product.warestatus = r.skuState;//getAreaSkuState(currentSkuId);
    }
    //上一次选择的sku
    pageConfig.product.prevSku = pageConfig.product.skuid;
    //变换到对应分区的sku
    pageConfig.product.skuid = currentSkuId;
    if (useAreaPrice&&!pricePageLoad){  //按地区加载价格且不是初始加载
        setPriceData(pageConfig.product.skuid,[currentAreaInfo.currentProvinceId,currentAreaInfo.currentCityId,currentAreaInfo.currentAreaId].join("_")); //改变价格
    }
    pricePageLoad = false;
    return currentSkuId;
}
//获取配送库存信息或下一级地址
function GetCurrentStock(ipLocArray){
    if($("#choose-type .item").length>0){
        var data_id=$("#choose-type .selected").attr("data-id");
        var extraParam = "{\"originid\":\"1\"}";
        if(data_id&&data_id!="100"){
            extraParam="{\"originid\":\"1\",\"heYueJi\":\"1\"}";
        }
        if(pageConfig.product.stockExtraParam!=extraParam){
            pageConfig.product.stockExtraParamChange=true;
        }
        else{
            pageConfig.product.stockExtraParamChange=false;
        }
        if($("#choose-type .item").length>1||pageConfig.product.stockExtraParamChange){
            GetStockInfoOrNextAreas(currentAreaInfo.currentProvinceId,currentAreaInfo.currentCityId,currentAreaInfo.currentAreaId,0,pageConfig.product.cat[2],3,true,ipLocArray);
        }
    }
}

pageConfig.eventTarget.addListener('onNumChange', function(data) {
    GetStockInfoOrNextAreas(currentAreaInfo.currentProvinceId,currentAreaInfo.currentCityId,currentAreaInfo.currentAreaId,0,pageConfig.product.cat[2],3,false,currentPageLoad.areaCookie);
});
pageConfig.product.suitSkuids = (function(){
	var suits = $("#choose-suit .item");
	var suitSkus = [];
	if (suits.length > 1){
		for(var i=1,j=suits.length;i<j;i++){
			if(suits.eq(i).attr("data-sku")){
				suitSkus.push(suits.eq(i).attr("data-sku"));
			}
		}
	}
	return suitSkus.length>0?suitSkus.join(","):"";
})();
function GetStockInfoOrNextAreas(provinceId,cityId,areaId,townId,sortId,curLevel,choosetype,ipLocArray){
    try{
        pageConfig.product.currentProvinceId = provinceId;
        currentAreaInfo.currentProvinceId = provinceId;
        currentAreaInfo.currentCityId = cityId;
        currentAreaInfo.currentAreaId = areaId;
        currentAreaInfo.currentTownId = townId;
        curLevel = new Number(curLevel);
        if (curLevel == requestLevel){
            currentAreaInfo.currentLevel = curLevel; //
            currentAreaInfo.currentRequestLevel = curLevel;  //
            if (useAreaPrice&&!pricePageLoad){  //按地区加载价格且不是初始加载
                setPriceData(pageConfig.product.skuid,[provinceId,cityId,areaId].join("_")); //改变价格
            }
            pricePageLoad = false;
            JdStockTabs.removeClass("curr").eq(curLevel-1).addClass("curr");
            JdStockTabs.find("a").removeClass("hover").eq(curLevel-1).addClass("hover");
            if (provinceId!=84){
                var data_id=window.CellPhone && window.CellPhone.$currHeYue
                    ? window.CellPhone.$currHeYue.attr('data-id')
                    : null;
                var callbackMethod = "getStockCallback";
                var extraParam = "{\"originid\":\"1\"}";
                if(data_id&&data_id!="100"){
                    extraParam="{\"originid\":\"1\",\"heYueJi\":\"1\"}";
                    $("#issue-list").show();
                }
                else{
                    $("#issue-list").hide();
                }
                pageConfig.product.stockExtraParam=extraParam;
                if(choosetype){
                    callbackMethod = "getStockCallback1";
                }

                var skuId = pageConfig.product.skuid;
                var venderId = pageConfig.product.venderId;
                var areaId = provinceId + '_' + cityId + '_' + areaId + '_' + townId;
                var cat = pageConfig.product.cat[0] + ',' + pageConfig.product.cat[1] + ',' + pageConfig.product.cat[2];
                var buyNum = $("#buy-num").val();
                var stockUrl = '//c0.3.cn/stock?skuId='+skuId + '&venderId='+venderId+'&cat='+cat+'&area='+areaId+'&buyNum='+buyNum+'&extraParam=' + extraParam + "&ch=1"+(pageConfig.product.suitSkuids?"&choseSuitSkuIds="+pageConfig.product.suitSkuids:"");
                $.ajax({
                    url: stockUrl,
                    dataType: 'jsonp',
                    jsonpCallback: callbackMethod,
                    cache: true,
                    timeout:6000,
                    error:function(){
                        window[callbackMethod]({"stock":{"IsPurchase":false,"ArrivalDate":null,"Ext":"","PopType":0,"StockStateName":"有货","code":1,"StockState":33,"realSkuId":pageConfig.product.skuid}});
                    }
                });
            }
            else{
                getStockCallback({"stock":{"IsPurchase":false,"ArrivalDate":null,"Ext":"","PopType":0,"StockStateName":"无货","code":1,"StockState":0,"realSkuId":pageConfig.product.skuid}});
            }
        }
        else if (curLevel < requestLevel){ //还需要获取下级地址
            currentAreaInfo.currentLevel = curLevel +1;
            JdStockTabs.removeClass("curr").eq(curLevel).addClass("curr");
            JdStockTabs.find("a").removeClass("hover").eq(curLevel).addClass("hover");
            //arguments[curLevel - 1] 表示参数的第几个位置（第零个省、以此类推）
            getChildAreaHtml(arguments[curLevel - 1],curLevel +1,ipLocArray);
        }
    }catch(err){
    }
}
function setCommonCookies(provinceId, provinceName,cityId,areaId,townId,isWriteAdds){
    createCookie("ipLocation", escape(provinceName), 30, "/;domain=" + locPageHost);//省
    createCookie("areaId", escape(provinceId), 10, "/;domain=" + locPageHost);//省
    var adds = provinceId+"-"+cityId+"-"+areaId+"-"+townId;
    createCookie("ipLoc-djd", escape(adds), 30, "/;domain=" + locPageHost);//省市区
    /*if (!isUseServiceLoc||!isWriteAdds){
     } else{
     $.ajax({url:"//uprofile.jd.com/u/setadds",type:"get",dataType:"jsonp",data:{adds:adds}});
     }*/
}
//根据省份ID获取名称
function getNameById(provinceId){
    for(var o in iplocation){
        if (iplocation[o]&&iplocation[o].id==provinceId){
            return o;
        }
    }
    return "北京";
}
//初始化
var currentPageLoad = {"isLoad":true,"areaCookie":[1,72,0,0]};
//切换标签控件
var JdStockTabs = null;
var JdStockContents = null;
var provinceHtml = '<div data-widget="tabs" class="m JD-stock" id="JD-stock">'
    +'<div class="mt">'
    +'    <ul class="tab">'
    +'        <li data-index="0" data-widget="tab-item" class="curr" clstag="shangpin|keycount|product|yijidizhi"><a href="#none" class="hover"><em>请选择</em><i></i></a></li>'
    +'        <li data-index="1" data-widget="tab-item" style="display:none;" clstag="shangpin|keycount|product|erjidizhi"><a href="#none" class=""><em>请选择</em><i></i></a></li>'
    +'        <li data-index="2" data-widget="tab-item" style="display:none;" clstag="shangpin|keycount|product|sanjidizhi"><a href="#none" class=""><em>请选择</em><i></i></a></li>'
    +'        <li data-index="3" data-widget="tab-item" style="display:none;" clstag="shangpin|keycount|product|sijidizhi"><a href="#none" class=""><em>请选择</em><i></i></a></li>'
    +'    </ul>'
    +'    <div class="stock-line"></div>'
    +'</div>'
    +'<div class="mc" data-area="0" data-widget="tab-content" id="stock_province_item">'
    +'    <ul class="area-list">'
    +'       <li><a href="#none" data-value="1">北京</a></li><li><a href="#none" data-value="2">上海</a></li><li><a href="#none" data-value="3">天津</a></li><li><a href="#none" data-value="4">重庆</a></li><li><a href="#none" data-value="5">河北</a></li><li><a href="#none" data-value="6">山西</a></li><li><a href="#none" data-value="7">河南</a></li><li><a href="#none" data-value="8">辽宁</a></li><li><a href="#none" data-value="9">吉林</a></li><li><a href="#none" data-value="10">黑龙江</a></li><li><a href="#none" data-value="11">内蒙古</a></li><li><a href="#none" data-value="12">江苏</a></li><li><a href="#none" data-value="13">山东</a></li><li><a href="#none" data-value="14">安徽</a></li><li><a href="#none" data-value="15">浙江</a></li><li><a href="#none" data-value="16">福建</a></li><li><a href="#none" data-value="17">湖北</a></li><li><a href="#none" data-value="18">湖南</a></li><li><a href="#none" data-value="19">广东</a></li><li><a href="#none" data-value="20">广西</a></li><li><a href="#none" data-value="21">江西</a></li><li><a href="#none" data-value="22">四川</a></li><li><a href="#none" data-value="23">海南</a></li><li><a href="#none" data-value="24">贵州</a></li><li><a href="#none" data-value="25">云南</a></li><li><a href="#none" data-value="26">西藏</a></li><li><a href="#none" data-value="27">陕西</a></li><li><a href="#none" data-value="28">甘肃</a></li><li><a href="#none" data-value="29">青海</a></li><li><a href="#none" data-value="30">宁夏</a></li><li><a href="#none" data-value="31">新疆</a></li><li><a href="#none" data-value="32">台湾</a></li><li><a href="#none" data-value="42">香港</a></li><li><a href="#none" data-value="43">澳门</a></li><li><a href="#none" data-value="84">钓鱼岛</a></li>'
    +'    </ul>'
    +'</div>'
    +'<div class="mc" data-area="1" data-widget="tab-content" id="stock_city_item"></div>'
    +'<div class="mc" data-area="2" data-widget="tab-content" id="stock_area_item"></div>'
    +'<div class="mc" data-area="3" data-widget="tab-content" id="stock_town_item"></div>'
    +'</div>';
var addressHtml = ''
    + '<div class="stock-add-select stock-add-used clicked clearfix">'
    + '     <div class="JD-stock-top">'
    + '         <strong class="fl">常用地址：</strong>'
    + '         <div class="fr add-collapse-arr J-collapse-trigger"><i></i></div>'
    + '     </div>'
    + '     <div class="JD-stock-con hide" id="JD-stock-used-wrap">'
    + '         <ul class="area-list area-list-used lh"></ul>'
    + '     </div>'
    + '</div>'
    + '<div class="stock-add-select stock-add-new clearfix">'
    + '     <div class="JD-stock-top unfold">'
    + '         <strong class="fl">选择新地址：</strong>'
    + '         <div class="fr add-collapse-arr J-collapse-trigger"><i></i></div>'
    + '     </div>'
    + '     <div class="JD-stock-con hide" id="JD-stock-wrap">'+provinceHtml+'</div>'
    + '</div>'
    + '<span class="clr"></span>';
var mouseEventChange = false;
function resetBindMouseEvent(){
    if (!mouseEventChange&&!currentPageLoad.isLoad){
        mouseEventChange = true;
        $("#store-selector").unbind("mouseout")
        $("#store-selector").unbind("mouseover").bind("mouseover",function(){
            $("#store-selector").addClass("hover");
        });
    }
}
function reBindStockEvent(){
    $("#store-selector").removeClass("hover");
}
var pricePageLoad = false; //是否已经初始化加载价格
var useAreaPrice = true;
function getStockInfoByArea(ipLoc){//获取地区库存
    if(!ipLoc){
        ipLoc = readCookie("ipLoc-djd");
    }
    currentPageLoad.notSet = false;
    if (!ipLoc) {
        currentPageLoad.notSet = true;
    }
    ipLoc = ipLoc?ipLoc.split("-"):[1,72,2799,0];
    if (useAreaPrice&&ipLoc.length>2&&new Number(ipLoc[2])>0){
        pricePageLoad = true;
        setPriceData(pageConfig.product.skuid,[ipLoc[0],ipLoc[1],ipLoc[2]].join("_")); //初始化加载价格
    }
    currentPageLoad.areaCookie = ipLoc;
    currentAreaInfo.currentProvinceName = getNameById(ipLoc[0]);
    currentLocation = currentAreaInfo.currentProvinceName;
    var province = iplocation[currentLocation];
    province = province?province:{ id: "1", root: 0, djd: 1,c:72 };
    currentAreaInfo.currentProvinceId = province.id;
    JdStockTabs.eq(0).find("em").html(currentAreaInfo.currentProvinceName);
    GetStockInfoOrNextAreas(province.id,0,0,0,pageConfig.product.cat[2],1,null,ipLoc);
}
var isUseServiceLoc = true; //是否默认使用服务端地址
(function(){
    if($(".product-intro-itemover").length>0){
        var ipLoc = readCookie("ipLoc-djd");
        ipLoc = ipLoc?ipLoc.split("-"):[1,72,0,0];
        ipLoc = ipLoc.length>2?ipLoc:[1,72,0,0];
        // 触发地区变化事件
        pageConfig.eventTarget.fire({
            type: 'onAreaChange',stock:'0',area:[ipLoc[0],ipLoc[1],ipLoc[2]]
        });
        return;
    }
    CurrentAreaInfoInit();
    $("#store-selector .content").html(addressHtml);
    (function() {
        $('.JD-stock-top').click(function () {
            $(this).toggleClass('unfold')
                .parents('.stock-add-select').eq(0).toggleClass('clicked');
        })
    })();
    //$(addressHtml).insertBefore("#store-selector .content .clr");
    //$('#JD-stock-wrap').html(provinceHtml);
    $("#store-selector").mouseover(function(){$(this).addClass("hover");}).mouseout(function(){$(this).removeClass("hover");});
    JdStockTabs = $("#JD-stock .tab li");
    JdStockContents = $("#JD-stock div[data-widget='tab-content']");
    JdStockTabs.bind('click',function(){
        var level = $(this).attr("data-index");
        level = new Number(level);
        JdStockTabs.removeClass("curr").eq(level).addClass("curr");
        JdStockTabs.find("a").removeClass("hover").eq(level).addClass("hover");
        JdStockContents.hide().eq(level).show();
    });
    getStockInfoByArea(null);
    $("#stock_province_item a").unbind("click").click(function() {
        currentPageLoad.isLoad = false;
        resetBindMouseEvent();
        try{
            CurrentAreaInfoInit();
            currentAreaInfo.currentProvinceId = $(this).attr("data-value");
            currentAreaInfo.currentProvinceName = $(this).html();
            currentLocation = currentAreaInfo.currentProvinceName;
            JdStockTabs.eq(0).find("em").html(currentAreaInfo.currentProvinceName);
            GetStockInfoOrNextAreas(currentAreaInfo.currentProvinceId,0,0,0,pageConfig .product.cat[2],1);
        }
        catch (err){
        }
    }).end();
    $("#store-selector .close").unbind("click").bind("click",function(){
        reBindStockEvent();
    });
    //POP图书最大1000
    if (pageConfig.product.cat[0]==1713&&G.isPop){
        $('#choose-btns #buy-num').unbind('keyup').attr('onkeyup',"").bind('keyup',function(){setAmount.max=1000;setAmount.modify("#buy-num");});
        $('#choose-btns .btn-add').unbind('click').attr('onclick',"").bind('click',function(){setAmount.max=1000;setAmount.add("#buy-num");});
    }
})();
(function () {
    $.ajax({
        url: "//cd.jd.com/usual/address?callback=?",
        data: '',
        dataType: "jsonp",
        scriptCharset: 'gbk',
        success: function (r) {
            if (r && r[0] && r[0].addressName) {//判断返回object有效
                var li_html = '';
                var i = 0;
                while (i < r.length) {
                    var addressVO = r[i];
                    var addressName = addressVO.addressName.replace("null","");
                    if (addressVO.addressDefault) {
                        addressName = "（默认）" + addressName
                    }
                    li_html += '<li clstag="shangpin|keycount|product|morendizhi_'+ G.pType +'"><a href="#none" title="' + addressVO.fullAddress + '" provinceId="' + addressVO.provinceId + '" cityId="' + addressVO.cityId + '" countyId="' + addressVO.countyId + '" townId="' + addressVO.townId + '" data-value="' + addressVO.areaName + '">' + addressName + '</a></li>';
                    i++;
                }
                $("#JD-stock-used-wrap").empty().append('<ul class="area-list area-list-used lh"></ul>')
                $("#JD-stock-used-wrap ul").append(li_html);

                $("#JD-stock-used-wrap a").unbind("click").bind("click", function(){
                    var provinceId = $(this).attr("provinceId");
                    var cityId = $(this).attr("cityId");
                    var countyId = $(this).attr("countyId");
                    var townId = $(this).attr("townId");
                    var areaName = $(this).attr("data-value");
                    currentAreaInfo.allAreaName = areaName;
                    GetStockInfoOrNextAreas(provinceId, cityId, countyId, townId, pageConfig.product.cat[2], 3, false, [provinceId, cityId, countyId, townId]);
                });
            } else {
                $(".stock-add-used").hide();
                $(".JD-stock-top").hide();
                $(".JD-stock-top").removeClass('unfold')
                    .parents('.stock-add-select').eq(0).addClass('clicked');
            }
        }
    });

})();
/*#$%#@!%*/
(function(iplocation){
    var serializeUrlCommon=function(url) {
        var sep = url.indexOf('?'),
            link = url.substr( 0, sep),
            params = url.substr( sep+1 ),
            paramArr = params.split('&'),
            len = paramArr.length,i,
            res = {},curr,key,val;

        for ( i=0; i<len; i++) {
            curr = paramArr[i].split('=');
            key = curr[0];
            val = curr[1];

            res[key] = val;
        }

        return {
            url: link,
            param: res
        }
    };
    if ( /storeAddressId/.test(location.href)) {
        // 拿url上storeAddressId的值，写入cookie
        var url=serializeUrlCommon(location.href);
        if (url.param['storeAddressId']){
            var pca=url.param['storeAddressId'].split('_');
            if(pca){
                var proname="";
                var area="";
                if(pca[0] && parseInt(pca[0]) == pca[0]) {
                    for(var o in iplocation){
                        if(iplocation[o].id==pca[0]){
                            proname=o;
                            area=pca[0];
                            break;
                        }
                    }
                }
                if(pca[1] && parseInt(pca[1]) == pca[1] && parseInt(pca[1])>0) {
                    area += "-"+pca[1];
                }
                else if(area){
                    area += "-0";
                }
                if(pca[2] && parseInt(pca[2]) == pca[2] && parseInt(pca[2])>0) {
                    area += "-"+pca[2];
                }
                else if(area){
                    area += "-0";
                }
                if(proname){
                    createCookie("ipLocation", escape(proname), 30, "/;domain=" + locPageHost);//省
                }
                if(area){
                    createCookie("ipLoc-djd", escape(area), 30, "/;domain=" + locPageHost);//省市区
                }
            }
        }
    }
})(iplocation);
//颜色尺码
var colorSizeObj = {
    //颜色尺码默认值
    defaultColor: null,
    defaultSize: null,
    defaultSpec: null,
    //颜色下无货提示
    alert_choose_size: null,
    //尺码下无货提示
    alert_choose_spec: null,
    //颜色尺码列表
    colorSize : null,
    colorSizeSkuIds : null,

    //转义这种情况 M\165L
    escapeColorSize: function(colorOrSizeOrSpce) {
        if (!colorOrSizeOrSpce) {
            return colorOrSizeOrSpce;
        }
        return colorOrSizeOrSpce.replace("\\", "\\\\").replace("*", "\\*").replace(".", "\\.").replace("(", "\\(").replace(")", "\\)");
    },

    //初始化
    init: function() {
        var colorName = $("#choose-color .dt").html() || "";
        colorName = colorName.replace("：","").replace("选择", "");
        var sizeName = $("#choose-version .dt").html() || "";
        sizeName = sizeName.replace("：","").replace("选择", "");
        var specName = $("#choose-spec .dt").html() || "";
        specName = specName.replace("：","").replace("选择", "");
        this.alert_choose_size = "所选" + colorName + "该" + sizeName + "商品在该地区无货";
        this.alert_choose_spec = "所选" + colorName + sizeName + "该" + specName + "商品在该地区无货";

        var colorSize = pageConfig.product.colorSize || {};
        this.colorSize = colorSize;
        //初始化选中列表
        var colorSizeSkuIds = {};
        var defaultValue = "*"; //必须和后台的一模一样

        var colors = {};
        var sizes = {};
        var specs = {};
        for(var i = 0, len = colorSize.length; i < len; i++) {
            var cs = colorSize[i];
            //默认值
            var Color = cs['Color'] || defaultValue;
            var Size = cs['Size'] || defaultValue;
            var Spec = cs['Spec'] || defaultValue;
            var SkuId = cs.SkuId;
            //选中颜色尺码
            if (SkuId == pageConfig.product.skuid) {
                if ($("#choose-color .dd .selected").length == 0) {
                    $("#choose-color a[title='" + this.escapeColorSize(Color) + "']").parent().addClass(" selected");
                }
                if ($("#choose-version .dd .selected").length == 0) {
                    $("#choose-version a[title='" + this.escapeColorSize(Size) + "']").parent().addClass(" selected");
                }
                if ($("#choose-spec .dd .selected").length == 0) {
                    $("#choose-spec a[title='" + this.escapeColorSize(Spec) + "']").parent().addClass(" selected");
                }
            }

            cs['Color'] = Color;
            cs['Size'] = Size;
            cs['Spec'] = Spec;
            //颜色尺码与sku关系
            if(!colorSizeSkuIds[Color]) {
                colorSizeSkuIds[Color] = {};
            }
            if(!colorSizeSkuIds[Color][Size]) {
                colorSizeSkuIds[Color][Size] = {};
            }
            colorSizeSkuIds[Color][Size][Spec] = SkuId;
            colors[Color] = Color;
            sizes[Size] = Size;
            specs[Spec] = Spec;
        }

        this.defaultColor = defaultValue;
        this.defaultSize = defaultValue;
        this.defaultSpec = defaultValue;
        var colorCount = 0;
        var onlyOneColor = defaultValue;
        for(var key in colors) {
            colorCount = colorCount + 1;
            onlyOneColor = key;
        }
        if(colorCount == 1) {
            this.defaultColor = onlyOneColor;
        }
        var sizeCount = 0;
        var onlyOneSize = null;
        for(var key in sizes) {
            sizeCount = sizeCount + 1;
            onlyOneSize = key;
        }
        if(sizeCount == 1) {
            this.defaultSize = onlyOneSize;
        }
        var specCount = 0;
        var onlyOneSpec = defaultValue;
        for(var key in specs) {
            specCount = specCount + 1;
            onlyOneSpec = key;
        }
        if(specCount == 1) {
            this.defaultSpec = onlyOneSpec;
        }
        this.colorSizeSkuIds = colorSizeSkuIds;
        var _parentThis = this;
        var colorSizeClickFunc = function() {

            var _this = $(this);
            var _div = _this.parent();

            if(_div.closest("#choose-color").length == 0 && (_div.is(".disabled") || _div.is(".selected"))) {
                return;
            }

            _div.parent().find(".selected").attr("class", "item");
            _div.attr("class", "item selected");

            var skuId = _parentThis.getSelectedColorSizeSkuId();
            if(skuId > 0) {
                window.location = skuId + ".html" + window.location.search;
            } else {
                _parentThis.changeColorSize(false);
            }
        };
        $("#choose-color a").attr("href", "#none").unbind("click").click(colorSizeClickFunc);
        $("#choose-version a").attr("href", "#none").unbind("click").click(colorSizeClickFunc);
        $("#choose-spec a").attr("href", "#none").unbind("click").click(colorSizeClickFunc);

    },
    //是否有颜色尺码
    hasSelectedColorSize: function() {
        if ($("#choose-color .item").length > 0) {
            return true;
        }
        if ($("#choose-version .item").length > 0) {
            return true;
        }
        if ($("#choose-spec .item").length > 0) {
            return true;
        }
        return false;
    },
    hasColorSize: function(color, size, spec) {
        var colorSizeSkuIds = this.colorSizeSkuIds;
        var hasColor = color;
        var hasSize = size;
        var hasSpec = spec;
        color = color || this.defaultColor;
        size = size || this.defaultSize;
        spec = spec || this.defaultSpec;


        if(!colorSizeSkuIds[color]) {
            return false;
        }

        if(!hasSize) {
            return true;
        }
        if(!colorSizeSkuIds[color][size]) {
            return false;
        }
        if(!hasSpec) {
            return true;
        }

        return colorSizeSkuIds[color][size][spec] != null;
    },
    getColorSizeSkuId: function(color, size, spec) {
        color = color || this.defaultColor;
        size = size || this.defaultSize;
        spec = spec || this.defaultSpec;


        if(!this.colorSizeSkuIds[color]) {
            return null;
        }
        if(!this.colorSizeSkuIds[color][size]) {
            return null;
        }
        return this.colorSizeSkuIds[color][size][spec];
    },
    //检查当前选中的颜色尺码库存状态
    getSelectedColorSizeSkuId: function() {
        if(!this.hasSelectedColorSize()) {
            return 0;
        }
        var color = $("#choose-color .selected a").attr("title");
        var size = $("#choose-version .selected a").attr("title");
        var spec = $("#choose-spec .selected a").attr("title");
        var skuId = this.getColorSizeSkuId(color, size, spec);
        if(!skuId) {
            return 0;
        }
        return skuId || 0;
    },
    changeColorSize: function(flag) {
        if(!this.hasSelectedColorSize()) {
            return;
        }

        var selectedColor = $("#choose-color .selected a").attr("title");
        var selectedSize = $("#choose-version .selected a").attr("title");
        var selectedSpec = $("#choose-spec .selected a").attr("title");
        var colorDoms = $("#choose-color .item");
        var versionDoms = $("#choose-version .item");
        var specDoms = $("#choose-spec .item");

        for(var i = 0, j = colorDoms.length; i < j; i++) {
            var colorDom = $(colorDoms[i]);
            var currColor = colorDom.find("a").text();
            if(currColor != selectedColor && !this.hasColorSize(currColor, selectedSize)) {
                colorDom.attr("class", "item disabled");
                colorDom.find("b").hide();
            } else {
                if(colorDom.is(".disabled")) {
                    colorDom.attr("class", "item");
                }
                colorDom.find("b").show();
            }
        }

        var selectedColor = $("#choose-color .selected a").attr("title");
        if(!selectedColor) {
            $("#choose-color").addClass("item-hl-bg");
        } else {
            $("#choose-color").removeClass("item-hl-bg");
        }

        for(var i = 0, j = versionDoms.length; i < j; i++) {
            var sizeDom = $(versionDoms[i]);
            var currSize = sizeDom.find("a").text();
            var isNotSelectColor = $("#choose-color").is(".item-hl-bg");
            if(isNotSelectColor || !this.hasColorSize(selectedColor, currSize)) {
                sizeDom.attr("class", "item disabled");
                sizeDom.find("b").hide();
                sizeDom.find("a").attr("title",this.alert_choose_size);

            } else {
                if(sizeDom.is(".disabled")) {
                    sizeDom.attr("class", "item");
                }
                sizeDom.find("b").show();
                sizeDom.find("a").attr("title", currSize);
            }
        }

        var selectedSize = $("#choose-version .selected a").attr("title");
        if(!selectedSize) {
            $("#choose-version").addClass("item-hl-bg");
        } else{
            $("#choose-version").removeClass("item-hl-bg");
        }

        for(var i = 0, j = specDoms.length; i < j; i++) {
            var specDom = $(specDoms[i]);
            var currSpec = specDom.find("a").text();
            var isNotSelectSize = $("#choose-version").is(".item-hl-bg");
            if(isNotSelectSize || !this.hasColorSize(selectedColor, selectedSize, currSpec)) {
                specDom.attr("class", "item disabled");
                specDom.find("b").hide();
                specDom.find("a").attr("title",this.alert_choose_spec);
            } else {
                if(specDom.is(".disabled")) {
                    specDom.attr("class", "item");
                }
                specDom.find("b").show();
                specDom.find("a").attr("title", currSpec);

            }
        }

        var selectedSpec = $("#choose-spec .selected a").attr("title");
        if(!selectedSpec) {
            $("#choose-spec").addClass("item-hl-bg");
        } else{
            $("#choose-spec").removeClass("item-hl-bg");
        }

        if(!flag) {
            pageConfig.M_easyBtn.hide();
            $.divide_button.hide();
            $.notice_button.hide();
            if($.append_button.length > 0) { //购物车
                $.append_button.attr("href","#none").attr("onclick", "").unbind("click");
            }
            $("#choose-btn-subsidy").hide();
        }
    }
};
colorSizeObj.init();
colorSizeObj.changeColorSize(true);

/******************/
var spuSort={"1620":"1-家居家装","5025":"1-钟表","6219":"2-水具酒具","6233":"1-玩具乐器","6994":"1-宠物生活","6196":"1-厨具","1319":"1-母婴","1320":"1-食品饮料、保健食品",
    "1315":"1-服饰内衣","4837":"3-办公文具","1466":"2-体育娱乐","1467":"2-成人用品","1463":"2-运动器械","6728":"1-汽车用品","1713":"1-图书"};
if(spuSort[pageConfig.product.cat[0]+""]||spuSort[pageConfig.product.cat[1]+""]||spuSort[pageConfig.product.cat[2]+""]){
    var spuServiceUrl = "//spu.jd.com/json.html?cond=";
    var spuPageUrl = "//spu.jd.com/"+pageConfig.product.skuid+".html";
    function showProvinceStockDeliver(r){
        if(!r||r.totalCount<2)return;
        var minPrice = r.minPrice+'';
        var iPoint = minPrice.indexOf('.');
        minPrice += iPoint<0?'.00':(minPrice.length-iPoint-1>1?'':'0');
        r.minPrice = minPrice;
        if($("#ypds-list").length==0){
            $("#extInfo .jd-service").after('<div class="pop-store-list" id="ypds-list"></div>');
        }
        var topCount = 0;
        var cutCount = 0;
        var spuVenderInfos = '';
        if(pageConfig.product.cat[0] != 1713) {
            spuVenderInfos = '<div class="pop-store-item" clstag="shangpin|keycount|product|' + pType + '_onsale"><div class="c-left"><a href="'+spuPageUrl+'" class="hl_blue" target="_blank">'+(r.totalCount-cutCount)+'个卖家在售</a></div><div class="c-right"><span class="price">\u3000￥'+(r.minPrice+"")+'起</span></div></div>';
        }
        for (var i=0,j=r.skuStockVenders.length;i<j;i++){
            if (pageConfig.product.skuid+"" != r.skuStockVenders[i].skuId && topCount < 3){
                if(r.skuStockVenders[i].venderId==46875){ //屏蔽TJ
                    cutCount ++;
                }
                else{
                    spuVenderInfos += '<div class="pop-store-item" id="J_'+r.skuStockVenders[i].skuId+'"><div class="c-left"><a class="store-name" href="//item.jd.com/'+r.skuStockVenders[i].skuId+'.html" clstag="shangpin|keycount|product|' + pType + '_maijia'+ (topCount + 1) +'" target="_blank">'
                    +((r.skuStockVenders[i].venderId&&(r.skuStockVenders[i].skuId+"").length==10)?r.skuStockVenders[i].venderName:'京东商城')+'</a></div><div class="c-right"><span class="price"></span></div></div>';
                    topCount ++;
                }
            }
        }
        spuVenderInfos += '<div class="btnbox" clstag="shangpin|keycount|product|' + pType + '_allsale"><a href="'+spuPageUrl+'" class="btn-def" target="_blank">查看全部卖家</a></div>';
        $("#ypds-list").html(spuVenderInfos);
        $('<div id="ypds-info" clstag="shangpin|keycount|product|' + pType + '_yipinduoshang"><a href="'+spuPageUrl+'" class="hl_blue" target="_blank">'+(r.totalCount-cutCount)+'个卖家在售</a><span class="hl_red">\u3000￥'+(r.minPrice+"")+'</span> 起</div>').insertAfter("#choose");
        var sellerArray = $("#ypds-list .pop-store-item[id^='J_']");
        var skuIds = [];
        for (var i=0,j=sellerArray.length;i<j;i++){
            skuIds.push(sellerArray.eq(i).attr("id"));
        }
        if(skuIds.length>0){
            $.ajax({
                url:"//p.3.cn/prices/mgets?callback=?",
                data:{skuIds:skuIds.join(","),type:1},
                dataType:"jsonp",
                success:function(r){
                    if(r&&r.length>0){
                        for (var i=0,j=r.length;i<j;i++){
                            $("#ypds-list #"+r[i].id+" .price").html(new Number(r[i].p)>0?("￥"+r[i].p):"暂无报价");
                        }
                    }
                }
            });
        }
    }
    (function(){
        $.ajax({
            url:spuServiceUrl+"1_4_1_0_0_"+(pageConfig.product.cat[0]==1713?"1":"0")+"_"+pageConfig.product.skuid+"_1",
            dataType: 'jsonp',
            jsonpCallback: 'showProvinceStockDeliver',
            cache: true
        });
    })();
}
(function(){if($("#product-detail-2 table tr").length>0)$("<div class='detail-correction'>"+$("#product-detail-1 .detail-correction").html()+"</div>").insertBefore("#product-detail-2 table");})();
/*****/
function changeSpPrice(id){
    var val=$("#"+id).val();
    var min=$("#sp-price").val();
    var max=$("#sp-price1").val();
    if(parseInt(val)>0&&parseInt(val)+""==val){
    }else{$("#"+id).val("");}
}
function getImgFullPath(skuid,src,type){
    if(src&&src.toUpperCase().indexOf("HTTP:")==-1){
        src = "//img1"+(new Number(skuid))%5+".360buyimg.com/n"+type+"/"+src;
    }
    return src;
}
(function(obj){
    if(obj.length > 0){
        pageConfig.searchClick=function(type){
            var searchLink=obj.attr("data-url");
            var keyword=$("#sp-keyword").val();
            if(keyword){keyword=encodeURIComponent(encodeURIComponent(keyword));}
            var minprice=$("#sp-price").val();
            var maxprice=$("#sp-price1").val();
            if (keyword||minprice||maxprice){
                window.open(searchLink+"?orderBy=5&keyword="+keyword+"&minPrice="+minprice+"&maxPrice="+maxprice,"_blank");
            }
            else{
                if(type == 1) return;
                window.open(searchLink+"?orderBy=5","_blank");
            }
        };
        obj.click(pageConfig.searchClick);
    }
    var containers=$("#sp-hot-sale,#sp-hot-fo,#sp-reco");
    var priceDoms=containers.find(".p-price strong");
    var pids=[];
    for(var i=0,j=priceDoms.length;i<j;i++){
        pids.push(priceDoms.eq(i).attr("p").replace("J-p-","J_"));
    }
    if(pids.length>0){
        $.ajax({type:"get",
            dataType:"jsonp",
            url:"//p.3.cn/prices/mgets",
            data:{type:1,skuIds:pids.join(",")},
            success:function(r){
                if(r&&r.length>0){
                    for(var i=0,j=r.length;i<j;i++){
                        containers.find("strong[p='"+r[i].id.replace("J_","J-p-")+"']").html(new Number(r[i].p)>0?("￥"+r[i].p):"暂无报价");
                    }
                }
            }
        });
    }
})($("#btnShopSearch"));
var turl=$("#product-detail-5 .item-detail a:last").attr("href");
if(turl&&$("#product-detail-5 .link_1:last").html()=='请点击这儿查询......'){$("#product-detail-5 .link_1:last").attr("href",turl);}
if($(".right div[id='comment']").length==2)$(".right div[id='comment']").eq(1).remove();
if(typeof jsf=='undefined'||!jsf)jsf={};
if(G.isSelf && !G.isSelfBook && !G.isSelfMvd){ //自营非图书音像
    jsf.loadScript = function (url, callback){
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    }
    $.ajax({type:"get",
        dataType:"jsonp",
        url:"//x.jd.com/ShowInterface?ad_ids=57:1&urlcid3="+pageConfig.product.cat[2]+"&ad_type=8&spread_type=1&debug=0&location_info=0",
        success:function(data){
            if (data) {
                if (data.errcode == 0) {
                    try{
                        $('<div id="ad_market_1" class="m"></div>').appendTo(".left:first");
                        var el = document.getElementById('ad_market_1');
                        var data2 =/<script type=\"text\/javascript\">(.*?)<\/script>/gim.exec(data.data);
                        if (data2) {
                            var data3 = data2[1];
                            var dataHtml = data.data.replace(/<script type=\"text\/javascript\">.*?<\/script>/gmi,'');
                            el.innerHTML = dataHtml;
                            eval(data3);
                        }else {
                            el.innerHTML = data.data;
                        }
                        if (data.scriptsrc) {
                            jsf.loadScript(data.scriptsrc);
                        }
                    }catch (e){}
                }
            }
        }
    });
}



//图书试读 排名
function initBookPreviewAndRank() {

    if(!G.isSelfBook && !G.isSelfMvd) {
        return;
    }

    var skuId = pageConfig.product.skuid;
    var cat = pageConfig.product.cat[0] + ',' + pageConfig.product.cat[1] + ',' + pageConfig.product.cat[2];
    var ipLoc;
    if(!ipLoc){
        ipLoc = readCookie("ipLoc-djd");
        ipLoc = ipLoc ? ipLoc.split("-") : [1,72,0,0];
    }
    var areaId = ipLoc[0] + '_' + ipLoc[1] + '_' + ipLoc[2] + '_' + ipLoc[3];

    $.ajax({
        url: '//c.3.cn/book?skuId=' + skuId + "&cat=" + cat + "&area=" + areaId,
        type: 'GET',
        dataType: 'jsonp',
        scriptCharset: "gbk",
        cache: true,
        ifModified: true,
        jsonpCallback: "book_jsonp_callback",
        success: function (data) {
            if (!data) {
                return;
            }
            if (data.isNew){
                pageConfig.product.isNewBookDesc = "新品上架即将到货，敬请期待。";
                if (pageConfig.product.isNewBookDescState == "noshow"){
                    $("#store-prompt").html($("#store-prompt").html().replace('此商品暂时售完',pageConfig.product.isNewBookDesc));
                }
            }
            //电子书试读
            var ebookId = data.ebookId;
            if (G.isSelfBook && ebookId) {
                if(data.yn==1||data.yn==2){
                    $("#preview .i-book-sample").attr("href", "//cread.e.jd.com/read/startRead.action?bookId=" + ebookId + "&readType=1").show();
                }
                if(data.yn == 1) { //只有有效时才显示价格
                    var price = "暂无报价";
                    var p = data.p;
                    var jp = new Number(p);
                    if (jp > 0) {
                        price = "￥" + p;
                    } else if (jp == 0) {//只有电子书才有免费
                        price = "免费";
                    }
                    $("#choose-btn-ebook .btn-ebook span").html(price);
                    $("#choose-btn-ebook").show().find(".btn-ebook").attr("href", "//e.jd.com/" + ebookId + ".html");
                }
            }

            //排名
            var rank = data.rank;
            var sortname = $("#root-nav .breadcrumb").find("span").eq(0).find("a").eq(0).html();
            if(rank && rank > 0 && sortname) {
                if(G.isSelfBook && rank <= 500) {
                    $('<div id="summary-order" class="li" clstag="shangpin|keycount|product|' + pType + '_paihangbang"><div class="dt">排\u3000\u3000名：</div><div class="dd">自营 <a href="//book.jd.com/booktop/'+pageConfig.product.cat[1]+'-0-0-0-10001-1.html" target="_blank">' + sortname
                    +'销量榜 </a>第 <font style="color:red;">' + rank + '</font> 位</div></div>').insertBefore("#summary-stock");
                } else if (G.isSelfMvd && rank <= 100) {
                    $('<div id="summary-order" class="li" clstag="shangpin|keycount|product|' + pType + '_paihangbang"><div class="dt">排\u3000\u3000名：</div><div class="dd">自营 <a href="//mvd.jd.com/mvdtop-'+pageConfig.product.cat[0]+'-1-0-1.html" target="_blank">' + sortname
                    +'销量榜 </a> <font style="color:red;">' + rank + '</font> 位</div></div>').insertBefore("#summary-stock");
                }
            }
        }
    })
}


initBookPreviewAndRank();

