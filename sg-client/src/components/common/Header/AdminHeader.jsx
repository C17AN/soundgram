import React from 'react'
import commonStyle from "styles/common.module.scss"

const AdminHeader = () => {
  return (
    <ul>
      <li className={`${commonStyle.dropdown} ${commonStyle["notification-list"]} ${commonStyle.noti_wrap}"`} style={{ display: "inline-block", float: "left" }}>
        <a className={`${commonStyle["nav-link"]} ${commonStyle["dropdown-toggle"]}  ${commonStyle["waves-effect"]} ${commonStyle["waves-light"]} ${commonStyle.noti}`} data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
          <span id="alarm_count"></span>
        </a>
        <ul className={`${commonStyle["dropdown-menu"]} ${commonStyle["dropdown-lg"]} ${commonStyle["dropdown-mobile"]} ${commonStyle["dropdown-menu-right"]} ${commonStyle["notifiacation-custom"]}`}>
          <div className={`${commonStyle["noti-title"]}`}>
            <h5 className="m-0">
              Notification
              <a id="confirm-all-alarm-button" className="text-dark float-right pointer" onClick="checkAllAlarmForUser(<?=$user_idx?>)">
                <small>전체확인</small>
              </a>
            </h5>
          </div>
          <div className={`${commonStyle["dropdown-divider"]}`}></div>
          <div id="alarm-list" className="slimscroll">
          </div>
          <a href="main_alarm_history.php" className="dropdown-item text-center text-primary notify-item notify-all noti_more">
            더보기
            <i className="fi-arrow-right"></i>
          </a>
        </ul>
      </li>
      <li className={`${commonStyle.dropdown} ${commonStyle["notification-list"]}`} style={{ display: "inline-block", float: "left" }}>
        <a className={`${commonStyle["nav-link"]} ${commonStyle["dropdown-toggle"]}  ${commonStyle["waves-effect"]} ${commonStyle["waves-light"]} ${commonStyle["responsive-button-wrapper"]}`}
          id="nav-customer-dropdown"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false">
          <button type="button" className="btn btn-secondary responsive-button btn01" id="customer_type_name">
          </button>
        </a>
        <div className={`${commonStyle["dropdown-menu"]} ${commonStyle["dropdown-lg"]} ${commonStyle["responsive-dropdown-menu"]}`} aria-labelledby="nav-customer-dropdown">
          <div className="slimscroll noti-scroll">
            <a className="dropdown-item notify-item" style={{ width: "100%" }} onClick="handleClickCustomerType(<?=$type?>, '<?=$name?>'); clickfunc();">
              <div className="notify-icon bg-soft-primary text-primary">
                <i className="remixicon-group-line"></i>
              </div>
              <p className="notify-details"></p>
            </a>
          </div>
        </div>
      </li>
      <li className={`${commonStyle.dropdown} ${commonStyle["notification-list"]} <?php echo $customer_type==$type? '' : 'hidden' ?>"`} id="customer_dropdown_<?=$type?>" style={{ display: "inline-block", float: "left" }}>
        <a className={`${commonStyle["nav-link"]} ${commonStyle["dropdown-toggle"]}  ${commonStyle["waves-effect"]} ${commonStyle["waves-light"]} ${commonStyle["responsive-button-wrapper"]}`}
          id="nav-customer-dropdown"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false">
          <button type="button" className="btn btn-secondary responsive-button btn01">
          </button>
        </a>
        <div className={`${commonStyle["dropdown-menu"]} ${commonStyle["dropdown-lg"]} ${commonStyle["responsive-dropdown-menu"]}`} aria-labelledby="nav-customer-dropdown">
          <div className="slimscroll noti-scroll">
            <a className="dropdown-item notify-item" style={{ width: "100%" }}>
              <div className="notify-icon bg-soft-primary text-primary">
                <i className="remixicon-group-line"></i>
              </div>
              <p className="notify-details"></p>
            </a>
          </div>
        </div>
      </li>
      <li className={`${commonStyle.dropdown} ${commonStyle["notification-list"]}`} style={{ display: "inline-block", float: "left" }} id="brand_dropdown">
        <a className={`${commonStyle["nav-link"]} ${commonStyle["dropdown-toggle"]}  ${commonStyle["waves-effect"]} ${commonStyle["waves-light"]} ${commonStyle["responsive-button-wrapper"]}`} data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
          <button type="button" className="btn btn-secondary responsive-button btn02"></button>
        </a>
        <div className={`${commonStyle["dropdown-menu"]} ${commonStyle["dropdown-lg"]}`} >
          <h5 className="m-0">
          </h5>
          <div className="slimscroll noti-scroll">
            <a className="dropdown-item notify-item" style={{ width: "100%" }}>
              <div className="notify-icon bg-soft-primary text-primary">
                <i className="remixicon-group-line"></i>
              </div>
              <p className={commonStyle["notify-details"]}></p>
            </a>
          </div>
        </div>
      </li>
      <li className={commonStyle["user_wrap"]}>
        <a href="javascript:void(0);" role="button" className="id">
          <span></span>
        </a>
        <ul>
          <li><a href="javascript:void(0);" ><i className="remixicon-user-3-line"></i><span className={commonStyle["user_edit"]}>회원정보 수정</span></a></li>
          <li><a href="logout.php" ><i className="remixicon-logout-box-line"></i><span className={commonStyle["log_out"]}>로그아웃</span></a></li>
        </ul>
      </li>
    </ul>
  )
}

export default AdminHeader