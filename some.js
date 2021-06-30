$(`[where]`).on(`click`,function () {
	$(`html`).animate({scrollTop:$(`.`+$(this).attr(`where`)).offset().top},500)
})
$(`[where]`).wrap(`<div class="blocko beet2"></div>`);
$(`.blocko`).append(`<div class="min-line"></div>`);

var sum=[`.body__flex`,`.email__showy`].forEach(function (elem) {
	$(elem).children().each(function () {
		$(this).attr(`alt`,`blue`);
	})
})
var savedSrc;
var elem=$(`<div class="block-over">
	<div class="block-over__elem beet2">
		<img src="./images/zoom.webp" alt="lup">
	<div class="block-over__flex beet">
		<img src="./images/zep.png" alt="">
		<img src="./images/info.png" alt="">
		<img src="./images/like.png" alt="">
	</div>
	</div>
</div>`)
var mouses=[
	[
		`[where]`,
	function () {$(this).parent().find(`div`).addClass(`see-min-line`)},
	function () {$(this).parent().find(`div`).removeClass(`see-min-line`)}
	],
	[
		`[alt="blue"]`,
		function () {
			var attr=$(this).attr(`src`).split(`.`);
			attr.shift();
			attr[0]+=`Blue.`
			$(this).attr(`src`,`.`+attr.join(``));
		},
	function () {
		var attr=$(this).attr(`src`).split(`.`);
			attr.shift();
			attr[0]=attr[0].replace(`Blue`,`.`);
			$(this).attr(`src`,`.`+attr.join(``));
	}
	],
	[
		`.maps__img`,
		function () {$(this).removeClass(`circle-rotate`)},
		function () {$(this).addClass(`circle-rotate`)}
	]
].forEach(function (elem) {
	$(elem[0]).on(`mouseenter`,elem[1])
	$(elem[0]).on(`mouseleave`,elem[2])
})
$(`.people1`).find(`[alt="hide"]`).on(`mouseenter`,showTitle)
$(`.people2`).find(`[alt="hide"]`).on(`mouseenter`,showTitle)
function showTitle() {
	if ($(window).width()<=480) return;
	savedSrc=$(this).attr(`src`)
	var mass={width:$(this).width(),height:$(this).height(),top:$(this).offset().top,left:$(this).offset().left};
	$(`body`).append(elem.css(mass));
	$(`body`).append($(`<div class="flat"></div>`).css(mass))
	$(`.block-over`).on(`mouseleave`,function () {
		$(this).remove();
		$(`.flat`).remove()
	})
	$(`[alt="lup"]`).on(`click`,function () {
		fonDel.call($(this))
		var src;
		if ($(this).attr(`from`)) {
			src=$(this).parent().parent().find(`.slider__images img`).attr(`src`);
		} else {
			src=savedSrc;
		}
		$(`.fon`).slideDown(700).css({display:"flex"});
		$(`.fon__main`).attr(`src`,src)
	})
}
class Slider{
	constructor(element){
		this.mass=element.find(`[alt="hide"]`);
		this.element=element.find(`.slider__images`);
		this.mass.each(function (index) {
			const dot_=$(`<div index="${index}">${index}</div>`);
			if (index==0) dot_.addClass(`selected`);
			element.find(`.slider__dots`).append(dot_);
		})
		element.find(`.slider__images`).append(this.mass[0]);
		element.find(`[whereGo]`).on(`click`,(event)=>{this.deploy(`arrow`,$(event.target).attr(`whereGo`))});
		element.find(`.slider__dots div`).on(`click`,(event)=>{this.deploy(`button`,+$(event.target).attr(`index`))})
		element.attr(`active`,true)
	}
	count=0;
	deploy(type,direction){
		if (this.element.attr(`active`)==`false`) return;
		this.element.attr(`active`,false);
		setTimeout(()=>{this.element.attr(`active`,true)},500);
		var out={} , howToAnim;
		if (type==`arrow`) {
			if (direction==`down`) {
				this.count++
				howToAnim=`-`
				out.top=`100%`
			} else {
				this.count--
				out.top=`-100%`
				howToAnim=`+`
			}
		} else	{
			 howToAnim=(this.count<direction) ? `-` : `+`;
			 out.top=(this.count<direction) ? `100%` : `-100%`;
			 this.count=direction;
		}
		(howToAnim==`-`) ? 	this.element.find(`img`).animate({top:`-100%`},250) : this.element.find(`img`).animate({top:`100%`},250);
		if (this.count>this.mass.length-1) this.count=0
		else if (this.count<0) this.count=this.mass.length-1;
		setTimeout(()=>{
			$(`[index]`).removeClass(`selected`);
			$(`[index="${this.count}"]`).addClass(`selected`)
			this.element.empty();
			this.element.append($(this.mass[this.count]).css(out).animate({top:0},250))
		},250);
	}
}
var slider1=new Slider($(`.people1`)) , slider2=new Slider($(`.people2`))

$(`.fon__cross`).on(`click`,function () {
	fonDel.call($(this))
	$(this).attr(`src`,`./images/crossWhite.png`);
	setTimeout(()=>{
		$(this).attr(`src`,`./images/cross.png`);
	},700);
	$(`.fon`).slideUp(700);
})
function fonDel() {
	if ($(this).attr(`active`)==`false`) return;
	$(this).attr(`active`,false);
	setTimeout(()=>{$(this).attr(`active`,true);},700);
}