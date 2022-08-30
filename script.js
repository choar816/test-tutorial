let body = document.querySelector("body");
let htmlTag = document.createElement("html");
let bodyTag = document.createElement("body");
let $innerContent = $(
  "<p>[inner html, body tag] <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus velit tempora cupiditate alias itaque perferendis iure provident, numquam distinctio eum. Veniam vitae, maiores eum expedita minus enim alias natus vel. <br /> Nisi voluptate nulla officia. Delectus consectetur ipsa corporis doloremque dolorem repellendus saepe similique vitae voluptate velit nam voluptas non at impedit repudiandae repellat voluptatibus quibusdam esse, consequatur laudantium excepturi iste! <br /> Sequi quisquam, consequuntur excepturi dolore nihil corporis et consectetur error eius placeat iste! Suscipit quia incidunt soluta, aliquid ipsam dignissimos sit necessitatibus temporibus porro sunt nihil! Maxime hic in officiis!</p>"
);

// 하이라이트할 요소들 생성
let $button1 = $('<button id="button1">button1</button>');
let $button2 = $('<button id="button2">button2</button>');
let $button3 = $('<button id="button3">button3</button>');
let $button4 = $('<button id="button4">button4</button>');

// 하이라이트할 요소들의 배열 (button 1, 2, 3, 4)
let array_highlights = [$button1, $button2, $button3, $button4];
// 툴팁이 보여줄 내용의 배열
let array_tooltip_contents = ["11111", "22222222", "33333333", "4444444"];

// vail 생성
let $vailUp = $('<div id="vail_up"></div>');
let $vailDown = $('<div id="vail_down"></div>');
let $vailLeft = $('<div id="vail_left"></div>');
let $vailRight = $('<div id="vail_right"></div>');

// tooltip 생성
let $tooltip = $(
  `<div id="tooltip">
    <button id="button_close_tooltip">X</button>
    <p id="tooltip_content"></p>
    <button id="button_prev">이전</button>
    <button id="button_next">다음</button>
  </div>`
);

// 생성한 vail, tooltip, button 태그 적절히 삽입
// html, body 안에 html, body가 또 존재하도록 했음
$(htmlTag).css("border", "1px solid black");
$(bodyTag).append($button1);
$(bodyTag).append($("<br />"));
$(bodyTag).append($("<br /><span>asdfasdfasdfasdf</span>"));
$(bodyTag).append($button2);
$(bodyTag).append($innerContent);
$(bodyTag).append($button3);
$(bodyTag).append($("<br />"));
$(bodyTag).append(
  $("<br /><span>qwerqwerqwerqerqwerqqwertyqwertyqwertyasdfasdfasdf</span>")
);
$(bodyTag).append($button4);
$(bodyTag).append($tooltip);
htmlTag.append(bodyTag);
body.append(htmlTag);

// vail, tooltip 기본 style 설정
const vails = [$vailUp, $vailDown, $vailLeft, $vailRight];
const property_vail = {
  display: "none",
  background: "rgba(0, 0, 0, 0.2)",
  position: "absolute",
  "z-index": "100",
};
for (const vail of vails) vail.css(property_vail);
$tooltip.css({
  display: "none",
});

// html 태그 내에 vail, tooltip들 넣기
$("html").append($vailUp);
$("html").append($vailDown);
$("html").append($vailLeft);
$("html").append($vailRight);
$("html").append($tooltip);

// 하이라이트할 부분 설정
let elem_index = 0;
let elem_highlight = array_highlights[elem_index];

// "Project List" 버튼을 눌렀을 때
$("#btn_project_list").on("click", () => {
  elem_index = 0;
  elem_highlight = array_highlights[elem_index];
  locate_and_show_vails();
  locate_and_show_tooltip();
});

$(window).resize(() => {
  locate_and_show_vails();
  locate_and_show_tooltip();
});

$("#button_prev").on("click", handle_prev);
$("#button_next").on("click", handle_next);
$("#button_close_tooltip").on("click", hide_vails_and_tooltips);

//////////////////////////////// FUNCTIONS ////////////////////////////////

// 4개 vail 각각의 위치, 크기 설정
function locate_and_show_vails() {
  let offset = elem_highlight.offset();

  $vailUp.css({
    top: "0",
    left: "0",
    width: "100%",
    height: `${offset.top}`,
  });
  $vailDown.css({
    top: `${offset.top + elem_highlight.outerHeight(true)}px`,
    left: "0",
    width: "100%",
    height: `calc(100% - ${offset.top + elem_highlight.outerHeight(true)}px)`,
  });
  $vailLeft.css({
    top: `${offset.top}px`,
    left: "0",
    width: `${offset.left}px`,
    height: `${elem_highlight.outerHeight(true)}`,
  });
  $vailRight.css({
    top: `${offset.top}px`,
    left: `${offset.left + elem_highlight.outerWidth(true)}px`,
    width: `calc(100% - ${offset.left + elem_highlight.outerWidth(true)}px)`,
    height: `${elem_highlight.outerHeight(true)}`,
  });

  // vail 모두 보이게 설정
  for (const vail of vails) vail.css("display", "block");
}

function locate_and_show_tooltip() {
  if (!elem_highlight) return;
  let offset = elem_highlight.offset();

  // 내용을 n번째 내용으로 수정
  $("#tooltip_content").text(array_tooltip_contents[elem_index]);

  // 위치를 highlight element에 맞게 수정
  const tooltip_width = 150;
  let tooltip_left =
    offset.left - (tooltip_width - elem_highlight.outerWidth(true)) / 2;
  if (tooltip_left < 0) tooltip_left = offset.left;

  $tooltip.css({
    display: "block",
    position: "absolute",
    top: `${offset.top + elem_highlight.outerHeight(true) + 10}px`,
    left: `${tooltip_left}px`,
    width: `${tooltip_width}px`,
    background: "white",
    padding: "10px",
    border: "1px solid black",
    "z-index": 110,
    "border-radius": "10px",
  });
}

function hide_vails_and_tooltips() {
  $vailUp.css("display", "none");
  $vailDown.css("display", "none");
  $vailLeft.css("display", "none");
  $vailRight.css("display", "none");
  $tooltip.css("display", "none");
}

function handle_prev() {
  if (elem_index === 0) return;
  elem_index -= 1;
  elem_highlight = array_highlights[elem_index];
  locate_and_show_vails();
  locate_and_show_tooltip();
}

function handle_next() {
  if (elem_index === array_highlights.length - 1) {
    hide_vails_and_tooltips();
    return;
  }
  elem_index += 1;
  elem_highlight = array_highlights[elem_index];
  locate_and_show_vails();
  locate_and_show_tooltip();
}
