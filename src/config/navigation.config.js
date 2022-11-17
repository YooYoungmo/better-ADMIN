import navigationInfo from "./navigation.json";
import {MemberContext} from "../auth/member.context";

export default class NavigationConfig {
  static hasPermissions(memberPermissions, navigationPermissions) {
    if(navigationPermissions) {
      for(const permission of navigationPermissions) {
        if (memberPermissions.has(permission)) {
          return true;
        }
      }

      return false;
    }

    return true;
  }

  static getItemsByMemberPermission = () => {
    const memberPermissions = new Set(MemberContext.memberInformation.permissions ? MemberContext.memberInformation.permissions : []);
    const accessibleGnbItems = [];
    if (navigationInfo.items) {
      const gnbItems = navigationInfo.items;
      gnbItems.forEach(gnbItem => {
        // GNB
        if (!gnbItem.accessPermissions || this.hasPermissions(memberPermissions, gnbItem.accessPermissions)) {
          if (gnbItem.items) {
            // SNB
            const accessibleSnbItems = [];
            const snbItems = gnbItem.items
            snbItems.forEach(snbItem => {
              if (!snbItem.accessPermissions || this.hasPermissions(memberPermissions, snbItem.accessPermissions)) {
                if (snbItem.items) {
                  // Sub
                  const accessibleSubItems = [];
                  const subItems = snbItem.items
                  subItems.forEach(subItem => {
                    if (!snbItem.accessPermissions || this.hasPermissions(memberPermissions, subItem.accessPermissions)) {
                      accessibleSubItems.push(subItem);
                    }
                  });
                  snbItem.items = accessibleSubItems;
                }

                accessibleSnbItems.push(snbItem);
              }
            });
            gnbItem.items = accessibleSnbItems;
          }
          accessibleGnbItems.push(gnbItem);
        }
      });
    }
    return accessibleGnbItems;
  }

  static getFirstItemLink = () => {
    const gnbItems = this.getItemsByMemberPermission();
    if (gnbItems && gnbItems.length > 0) {
      const firstGnbItem = gnbItems[0];
      if(firstGnbItem.link) {
        return firstGnbItem.link;
      }

      if(firstGnbItem.items && firstGnbItem.items.length > 0) {
        const firstSnbItem = firstGnbItem.items[0];
        if (firstSnbItem.link) {
          return firstSnbItem.link;
        }

        if(firstSnbItem.items && firstSnbItem.items.length > 0 && firstSnbItem.items[0].link) {
          return firstSnbItem.items[0].link;
        }
      }
    }
    return null;
  }

  static getItemsWithoutMemberPermission = () => {
    const accessibleGnbItems = [];
    if (navigationInfo.items) {
      const gnbItems = navigationInfo.items;
      gnbItems.forEach(gnbItem => {
        // GNB
        if (gnbItem.items) {
          // SNB
          const accessibleSnbItems = [];
          const snbItems = gnbItem.items
          snbItems.forEach(snbItem => {
            if (snbItem.items) {
              // Sub
              const accessibleSubItems = [];
              const subItems = snbItem.items
              subItems.forEach(subItem => {
                accessibleSubItems.push(subItem);
              });
              snbItem.items = accessibleSubItems;
            }

            accessibleSnbItems.push(snbItem);
          });
          gnbItem.items = accessibleSnbItems;
        }
        accessibleGnbItems.push(gnbItem);
      });
    }
    return accessibleGnbItems;
  }

  static getItemsByLink = (pathName, navigationItems) => {
    const result = {
      gnbItem: null,
      snbItem: null,
      subItem: null
    }

    if (navigationItems) {
      for(const [i, gnbItem] of navigationItems.entries()) {
        const currentGnbItem = {
          title: gnbItem.title,
          index: String(i),
          icon: gnbItem.icon,
        }

        if (gnbItem.link && gnbItem.link === pathName) {
          result.gnbItem = currentGnbItem;
          return result;
        }

        if (gnbItem && gnbItem.items) {
          for(const [j, snbItem] of gnbItem.items.entries()) {
            const currentSnbItem = {
              title: snbItem.title,
              index: String(j),
              icon: snbItem.icon,
            }

            if (snbItem.link && snbItem.link === pathName) {
              result.gnbItem = currentGnbItem;
              result.snbItem = currentSnbItem;

              return result;
            }

            if (snbItem && snbItem.items) {
              for(const [k, subItem] of snbItem.items.entries()) {
                const currentSubItem = {
                  title: subItem.title,
                  index: String(k),
                  icon: subItem.icon,
                }

                if (subItem.link && subItem.link === pathName) {
                  result.gnbItem = currentGnbItem;
                  result.snbItem = currentSnbItem;
                  result.subItem = currentSubItem;

                  return result;
                }
              }
            }
          }
        }
      }
    }

    return result;
  }
}
