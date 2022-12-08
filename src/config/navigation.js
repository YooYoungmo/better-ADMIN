import {BiBeer, BiBluetooth} from "react-icons/bi";
import {SiAccusoft, SiAmazon, SiAmazondynamodb, SiApachenetbeanside} from "react-icons/si";
import {GiAbstract023} from "react-icons/gi";
import {AiFillSetting, AiOutlineControl} from "react-icons/ai";
import {FiUsers} from "react-icons/fi";
import {TbWebhook} from "react-icons/tb";
import {MdLogin} from "react-icons/md";

export const Navigation = {
  items: [
    {
      title: "GNB1-22",
      icon: <BiBluetooth/>,
      items: [
        {
          title: "SNB1",
          icon: <BiBeer/>,
          items: [
            {
              title: "Sub1",
              icon: <SiAccusoft/>,
              link: "/sub1"
            },
            {
              title: "Sub2",
              icon: <SiAmazon/>,
              link: "/sub2"
            }
          ]
        },
        {
          title: "SNB2",
          icon: <SiAmazondynamodb/>,
          disabled: true,
          link: "/snb2"
        },
        {
          title: "Sample",
          icon: <SiApachenetbeanside/>,
          link: "/sample-list"
        }
      ]
    }, {
      title: "GNB2",
      icon: <GiAbstract023/>,
      link: "/gnb2"
    }, {
      title: "접근 제어",
      accessPermissions: ["MANAGE_ACCESS_CONTROL"],
      icon: <AiOutlineControl/>,
      items: [
        {
          title: "역할",
          link: "/access-control/roles"
        },
        {
          title: "권한",
          link: "/access-control/permissions"
        }
      ]
    }, {
      title: "사용자/조직도",
      icon: <FiUsers/>,
      accessPermissions: ["MANAGE_MEMBERS", "MANAGE_ORGANIZATION"],
      items: [
        {
          title: "멤버",
          link: "/members",
          accessPermissions: ["MANAGE_MEMBERS"]
        },
        {
          title: "멤버 승인",
          link: "/member-approval",
          accessPermissions: ["MANAGE_MEMBERS"]
        },
        {
          title: "조직도",
          link: "/organization",
          accessPermissions: ["MANAGE_ORGANIZATION"]
        }
      ]
    }, {
      title: "설정",
      icon: <AiFillSetting/>,
      accessPermissions: ["MANAGE_SYSTEM_SETTINGS"],
      items: [
        {
          title: "로그인",
          icon: <MdLogin/>,
          items: [
            {
              title: "두레이",
              link: "/settings/login/dooray"
            },
            {
              title: "구글 워크스페이스",
              link: "/settings/login/google-workspace"
            }
          ]
        }, {
          title: "웹훅(Webhooks)",
          icon: <TbWebhook/>,
          items: [
            {
              title: "알림 웹훅",
              link: "/web-hooks/notifications",
            }
          ]
        }
      ]
    }
  ]
};
