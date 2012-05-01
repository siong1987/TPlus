MainView = function(users, current_user) {
  var users_list = _.map(users, function(user) {
    var html_node = '<li><a class="change_user" href="#">' + user + '</a></li>';
    return html_node;
  }).join("");

  var out = '\
  <table class="main_frame"><tr><td>\
    <form class="form-horizontal">\
      <table class="tb_center_width">\
        <tr>\
          <td>\
            <h2>TPlus</h2>\
          </td>\
          <td class="tb_cell">\
            <table class="tb_right">\
              <tr>\
                <td class="tb_cell">\
                  <div class="btn-group">\
                    <button id="goto" class="btn btn-info"><i class="icon-user icon-white"></i><span id="username">' + current_user + '</span></button>\
                    <button class="btn dropdown-toggle btn-info" data-toggle="dropdown">\
                      <span class="caret"></span>\
                    </button>\
                    <ul class="dropdown-menu">'
                      + users_list +
                      '<li class="divider"></li>\
                      <li><a href="#" id="sign-in">Add a new account</a></li>\
                      <li><a id="sign-out" href="#">Sign out</a></li>\
                    </ul>\
                  </div>\
                </td>\
                <td class="tb_cell">\
                  <div class="btn-group">\
                    <button class="btn"><i class="icon-cog"></i></button>\
                    <button class="btn dropdown-toggle" data-toggle="dropdown">\
                      <span class="caret"></span>\
                    </button>\
                    <ul class="dropdown-menu">\
                      <li>&nbsp;Themes:</li>\
                      <li><a href="#" rel="styles1" class="styleswitch">Default</a></li>\
                      <li><a href="#" rel="styles2" class="styleswitch">Amelia</a></li>\
                      <li><a href="#" rel="styles3" class="styleswitch">Cerulean</a></li>\
                      <li><a href="#" rel="styles4" class="styleswitch">Cyborg</a></li>\
                      <li><a href="#" rel="styles5" class="styleswitch">Journal</a></li>\
                      <li><a href="#" rel="styles7" class="styleswitch">Simplex</a></li>\
                      <li><a href="#" rel="styles8" class="styleswitch">Slate</a></li>\
                      <li><a href="#" rel="styles9" class="styleswitch">Spacelab</a></li>\
                      <li><a href="#" rel="styles10" class="styleswitch">Spruce</a></li>\
                      <li><a href="#" rel="styles11" class="styleswitch">Superhero</a></li>\
                      <li><a href="#" rel="styles12" class="styleswitch">United</a></li>\
                    </ul>\
                  </div>\
                </td>\
              </tr>\
            </table>\
          </td>\
        </tr>\
      </table>\
      <table class="tb_center_width">\
        <tr>\
          <td>\
            <textarea id="tweet-area" class="input-xlarge2" rows="4" placeholder="What\'s happening?"></textarea>\
          </td>\
        </tr>\
      </table>\
      <table class="tb_center_width">\
        <tr>\
          <td>\
            <table class="tb_right">\
              <tr>\
                <td>\
                  <label id="counter-display">140</label>\
                </td>\
              </tr>\
            </table>\
          </td>\
        </tr>\
      </table>\
      <table class="tb_center_width">\
        <tr>\
          <td>\
            <table class="tb_center">\
              <tr>\
                <td class="tb_cell">\
                  <!-- //save and restore buttons -->\
                  <div id="saving" class="btn-group">\
                    <button id="save-as-btn" class="btn">Save</button>\
                    <button class="btn dropdown-toggle" data-toggle="dropdown">\
                      <span class="caret"></span>\
                    </button>\
                    <ul id="save-list" class="dropdown-menu" align="center">\
                      <span><font size="2"><b>Restore Draft:</b></font></span>\
                      <li class="divider"></li>\
                    </ul>\
                  </div>\
                </td>\
                <td class="tb_cell">\
                  <button type="reset" id="getcurrenturl-btn" class="btn">Get URL</button>\
                </td>\
                <td class="tb_cell">\
                  <button type="submit" id="tweet-btn" class="btn btn-primary">Tweet</button>\
                </td>\
              </tr>\
            </table>\
          </td>\
        </tr>\
      </table>\
    </form>\
  </td></tr></table>\
  ';

  return out;
}
