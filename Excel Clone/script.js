$(document).ready(function () {
  let cellcontainer = $(".input-cell-container");

  for (let i = 1; i <= 100; i++) {
    let ans = "";
    let n = i;

    while (n != 0) {
      let rem = n % 26;
      if (rem == 0) {
        ans = "Z" + ans;
        n = Math.floor(n / 26) - 1;
      } else {
        ans = String.fromCharCode(rem - 1 + 65) + ans;
        n = Math.floor(n / 26);
      }
    }

    let column = $(`<div class="column-name colId-${i}" id="colCod-${ans}">${ans}</div>`);
      $(".column-name-container").append(column);
      let row = $(`<div class="row-name" id="rowId-${i}">${i}</div>`);
      $(".row-name-container").append(row);
    }
    
    for (let i = 1; i <= 100; i++) {
      let row = $(`<div class="cell-row"></div>`);
      for (let j = 1; j <= 100; j++) {
        let colCode = $(`.colId-${j}`).attr("id").split("-")[1];
        let column = $(
          `<div class="input-cell" contenteditable="true" id = "row-${i}-col-${j}" data="code-${colCode}"></div>`
        );
        row.append(column);
      }
      $(".input-cell-container").append(row);
    }

    $('.align-icon').click(function () {
        $(".align-icon.selected").removeClass("selected");
        $(this).addClass("selected");
    });
    $(".style-icon").click(function () {
        $(this).toggleClass("selected");
    })

    $(".input-cell").click(function (e) {
        if (e.ctrlKey) {
            let [rowid, colid] = getRowCol(this);
            if (rowid > 1) {
                let topcellselected = $(`#row-${rowid - 1}-col-${colid}`).hasClass('selected');
                if (topcellselected) {
                    $(this).addClass("top-cell-selected");
                    $(`#row-${rowid - 1}-col-${colid}`).addClass("bottom-cell-selected");
                }
            }
                if (rowid < 100) {
                let bottomcellselected = $(`#row-${rowid+1}-col-${colid}`).hasClass('selected');
                if (bottomcellselected) {
                    $(this).addClass("bottom-cell-selected");
                    $(`#row-${rowid+1}-col-${colid}`).addClass("top-cell-selected");
                }
            }
                if (colid > 1) {
                  let leftcellselected = $(
                    `#row-${rowid}-col-${colid-1}`
                  ).hasClass("selected");
                  if (leftcellselected) {
                    $(this).addClass("left-cell-selected");
                    $(`#row-${rowid}-col-${colid - 1}`).addClass(
                      "right-cell-selected"
                    );
                  }
            }
            if (colid < 100) {
              let rightcellselected = $(
                `#row-${rowid}-col-${colid+1}`
              ).hasClass("selected");
              if (rightcellselected) {
                $(this).addClass("right-cell-selected");
                $(`#row-${rowid}-col-${colid+1}`).addClass(
                  "left-cell-selected"
                );
              }
            }
            $(this).addClass("selected");
        }

        else {
            $(".input-cell.selected").removeClass("selected");
            $(this).addClass("selected");
        // $(this).attr("contenteditable", "false");

        }
        
    })

    $(".input-cell").dblclick(function () {
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).attr("contenteditable", "true");
        // $(this).focus();
    })

    $(".input-cell-container").scroll(function () {
        $(".column-name-container").scrollLeft(this.scrollLeft);
        $(".row-name-container").scrollTop(this.scrollTop);
    })
});


function getRowCol(e) {
    let idarr = $(e).attr("id").split("-");
    let rowid = parseInt(idarr[1]);
    let colid = parseInt(idarr[3]);
    return[rowid, colid];
}

function updateCell() {
    
}
