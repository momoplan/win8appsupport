// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ruyicai.win8.bean;

import java.lang.String;

privileged aspect Tuserinfo_Roo_ToString {
    
    public String Tuserinfo.toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Accesstype: ").append(getAccesstype()).append(", ");
        sb.append("Address: ").append(getAddress()).append(", ");
        sb.append("Agencyno: ").append(getAgencyno()).append(", ");
        sb.append("Certid: ").append(getCertid()).append(", ");
        sb.append("Channel: ").append(getChannel()).append(", ");
        sb.append("Email: ").append(getEmail()).append(", ");
        sb.append("Imei: ").append(getImei()).append(", ");
        sb.append("Info: ").append(getInfo()).append(", ");
        sb.append("Leave: ").append(getLeave()).append(", ");
        sb.append("Mac: ").append(getMac()).append(", ");
        sb.append("Mobileid: ").append(getMobileid()).append(", ");
        sb.append("Modtime: ").append(getModtime()).append(", ");
        sb.append("Msn: ").append(getMsn()).append(", ");
        sb.append("Name: ").append(getName()).append(", ");
        sb.append("Nickname: ").append(getNickname()).append(", ");
        sb.append("Password: ").append(getPassword()).append(", ");
        sb.append("Phone: ").append(getPhone()).append(", ");
        sb.append("Qq: ").append(getQq()).append(", ");
        sb.append("Regtime: ").append(getRegtime()).append(", ");
        sb.append("State: ").append(getState()).append(", ");
        sb.append("SubChannel: ").append(getSubChannel()).append(", ");
        sb.append("Type: ").append(getType()).append(", ");
        sb.append("UserName: ").append(getUserName()).append(", ");
        sb.append("Userno: ").append(getUserno());
        return sb.toString();
    }
    
}
