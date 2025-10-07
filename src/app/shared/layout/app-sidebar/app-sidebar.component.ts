import { CommonModule } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { combineLatest, Subscription } from "rxjs";
import { SafeHtmlPipe } from "../../pipe/safe-html.pipe";
import { SidebarService } from "../../services/sidebar.service";

type NavItem = {
  name: string;
  icon: string;
  path?: string;
  new?: boolean;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

@Component({
  selector: "app-sidebar",
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  templateUrl: "./app-sidebar.component.html",
})
export class AppSidebarComponent {
  // Main nav items
  navItems: NavItem[] = [
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V8.99998C3.25 10.2426 4.25736 11.25 5.5 11.25H9C10.2426 11.25 11.25 10.2426 11.25 8.99998V5.5C11.25 4.25736 10.2426 3.25 9 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H9C9.41421 4.75 9.75 5.08579 9.75 5.5V8.99998C9.75 9.41419 9.41421 9.74998 9 9.74998H5.5C5.08579 9.74998 4.75 9.41419 4.75 8.99998V5.5ZM5.5 12.75C4.25736 12.75 3.25 13.7574 3.25 15V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H9C10.2426 20.75 11.25 19.7427 11.25 18.5V15C11.25 13.7574 10.2426 12.75 9 12.75H5.5ZM4.75 15C4.75 14.5858 5.08579 14.25 5.5 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15V18.5C9.75 18.9142 9.41421 19.25 9 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V15ZM12.75 5.5C12.75 4.25736 13.7574 3.25 15 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V8.99998C20.75 10.2426 19.7426 11.25 18.5 11.25H15C13.7574 11.25 12.75 10.2426 12.75 8.99998V5.5ZM15 4.75C14.5858 4.75 14.25 5.08579 14.25 5.5V8.99998C14.25 9.41419 14.5858 9.74998 15 9.74998H18.5C18.9142 9.74998 19.25 9.41419 19.25 8.99998V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H15ZM15 12.75C13.7574 12.75 12.75 13.7574 12.75 15V18.5C12.75 19.7426 13.7574 20.75 15 20.75H18.5C19.7426 20.75 20.75 19.7427 20.75 18.5V15C20.75 13.7574 19.7426 12.75 18.5 12.75H15ZM14.25 15C14.25 14.5858 14.5858 14.25 15 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15C14.5858 19.25 14.25 18.9142 14.25 18.5V15Z" fill="currentColor"></path></svg>`,
      name: "Inicio",
      subItems: [
        {
          name: "Local",
          path: "/"
        },
        {
          name: "Ecommerce",
          path: "/ecommerce"
        }
      ],
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V3.75H15.25V2.75C15.25 2.33579 15.5858 2 16 2C16.4142 2 16.75 2.33579 16.75 2.75V3.75H18.5C19.7426 3.75 20.75 4.75736 20.75 6V9V19C20.75 20.2426 19.7426 21.25 18.5 21.25H5.5C4.25736 21.25 3.25 20.2426 3.25 19V9V6C3.25 4.75736 4.25736 3.75 5.5 3.75H7.25V2.75C7.25 2.33579 7.58579 2 8 2ZM8 5.25H5.5C5.08579 5.25 4.75 5.58579 4.75 6V8.25H19.25V6C19.25 5.58579 18.9142 5.25 18.5 5.25H16H8ZM19.25 9.75H4.75V19C4.75 19.4142 5.08579 19.75 5.5 19.75H18.5C18.9142 19.75 19.25 19.4142 19.25 19V9.75Z" fill="currentColor"></path></svg>`,
      name: "Calendario",
      path: "/calendario",
    },
    {
      icon: `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <path d="M11.0287 2.53961C11.6327 2.20402 12.3672 2.20402 12.9713 2.5396L20.4856 6.71425C20.8031 6.89062 21 7.22524 21 7.5884V15.8232C21 16.5495 20.6062 17.2188 19.9713 17.5715L12.9713 21.4604C12.3672 21.796 11.6327 21.796 11.0287 21.4604L4.02871 17.5715C3.39378 17.2188 3 16.5495 3 15.8232V7.5884C3 7.22524 3.19689 6.89062 3.51436 6.71425L11.0287 2.53961Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M7.5 4.5L16.5 9.5V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M6 12.3281L9 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M3 7L12 12M12 12L21 7M12 12V21.5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/> </g></svg>`,
      name: "Productos",
      path: "/productos",
    },
    {
      icon: `<svg fill="currentColor" height="800px" width="800px" version="1.1" id="XMLID_229_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"><g id="deliver"><g><path d="M17.6,22c-1.8,0-3.2-1.3-3.5-3H9c-0.2,1.7-1.7,3-3.5,3S2.3,20.7,2,19H0V3h16v4h3.4l4.6,4.6V19h-3C20.8,20.7,19.3,22,17.6,22z M16.1,18.5c0,0.8,0.7,1.5,1.5,1.5c0.8,0,1.5-0.7,1.5-1.5S18.4,17,17.6,17C16.8,17,16.1,17.7,16.1,18.5z M5.6,17c-0.8,0-1.5,0.7-1.5,1.5S4.8,20,5.6,20s1.5-0.7,1.5-1.5S6.4,17,5.6,17z M20.7,17H22v-4.6L18.7,9h-2.6v6.3c0.5-0.2,1-0.3,1.5-0.3C19,15,20.2,15.8,20.7,17z M8.7,17H14V5H2v12h0.3c0.6-1.2,1.8-2,3.2-2S8.2,15.8,8.7,17z"/></g></g></svg>`,
      name: "Pedidos",
      path: "/pedidos",
    },
    {
      icon: `<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 32 32" xml:space="preserve"><style type="text/css">.linesandangles_een{fill:currentColor;}</style><path class="linesandangles_een" d="M25.414,14l-6.707-6.707l-1.414,1.414L22.586,14H9.414l5.293-5.293l-1.414-1.414L6.586,14H4l2,14h20l2-14H25.414z M24.265,26H7.735L6.306,16h19.388L24.265,26z M11,20H9v-2h2V20z M15,20h-2v-2h2V20z M19,20h-2v-2h2V20zM23,20h-2v-2h2V20z M11,24H9v-2h2V24z M15,24h-2v-2h2V24z M19,24h-2v-2h2V24z M23,24h-2v-2h2V24z"/></svg>`,
      name: "Ventas",
      path: "/ventas",
    },
    {
      icon: `<svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      name: "Clientes",
      subItems: [
        {
          name: "Listado",
          path: "/clientes",
        },
        {
          name: "Crédito",
          path: "/clientes-credito"
        }
      ]
    },
    {
      icon: `<svg height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 56.93 56.93" xml:space="preserve">
              <g>
                <path style="fill:currentColor;" d="M48.654,40.217l-11.771,5.697l-4.547-9.395l11.771-5.697L48.654,40.217z M45.801,16.3l9.722,20.089
                  l-5.885,2.848l-9.723-20.088L45.801,16.3z M40.618,47.512l16.312-7.604l-0.381-1.603L38.864,46.51
                  c-0.838-0.271-1.756-0.332-2.675-0.11c-0.16,0.037-0.317,0.084-0.471,0.135L23.575,23.577c1.507-1.646,0.112-5.235-2.842-4.859
                  c-0.291,0.037-0.396,0.068-0.603,0.087c-2.797-0.194-5.6-1.117-8.139-2.459c-0.016-0.294-0.028-0.587-0.045-0.881
                  c-0.148-2.42-1.555-4.553-4.191-4.704c-2.205-0.126-4.852,1.764-4.704,4.191c0.35,5.73,0.346,7.134,0.328,12.627l-0.057-0.002
                  c0.035,0.73,0.069,1.94,0.107,2.672c0.055,1.136,0.455,2.048,1.053,2.735c0.005,0.008,0.006,0.02,0.013,0.026
                  c0.707,1.087,0.65,2.241,1.215,3.403c-1.043,4.955-4.331,9.906-5.605,14.812c-0.934,3.603,4.624,5.127,5.558,1.532
                  c1.284-4.941,5.213-9.938,6.266-14.934c0.054-0.254,0.073-0.498,0.069-0.729c3.46,3.575,5.784,9.387,6.221,14.463
                  c0.316,3.678,6.082,3.706,5.764,0c-0.729-8.468-5.046-16.685-11.671-21.777c-0.021-0.426-0.041-0.854-0.062-1.278l0.022,0.002
                  c0.01-3.447,0.018-2.288-0.05-5.734c2.385,0.913,4.895,1.494,7.413,1.687l-0.004,0.07c0.894-0.007,1.467-0.071,2.35-0.183
                  c0.164-0.021,0.307-0.063,0.451-0.104l11.761,23.151c-1.419,1.167-2.139,3.076-1.686,4.979c0.631,2.662,3.312,4.312,5.977,3.682
                  c2.662-0.634,4.312-3.314,3.68-5.977C41.918,49.043,41.36,48.164,40.618,47.512z M37.722,52.854
                  c-0.898,0.213-1.803-0.344-2.016-1.24c-0.214-0.897,0.344-1.804,1.24-2.017c0.896-0.214,1.803,0.345,2.016,1.241
                  C39.175,51.737,38.62,52.64,37.722,52.854z M38.93,20.127l4.548,9.395l-11.771,5.697l-4.548-9.394L38.93,20.127z M7.667,0.745
                  c2.392,0,4.331,1.939,4.331,4.331s-1.939,4.331-4.331,4.331S3.336,7.468,3.336,5.076S5.275,0.745,7.667,0.745z"/>
              </g>
            </svg>`,
      name: "Proveedores",
      path: "/proveedores",
    },
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z" fill="currentColor"></path></svg>`,
      name: "Perfil",
      path: "/perfil",
    }
  ];

  openSubmenu: string | null | number = null;
  subMenuHeights: { [key: string]: number } = {};
  @ViewChildren("subMenu") subMenuRefs!: QueryList<ElementRef>;

  readonly isExpanded$;
  readonly isMobileOpen$;
  readonly isHovered$;

  private subscription: Subscription = new Subscription();

  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.isExpanded$ = this.sidebarService.isExpanded$;
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
    this.isHovered$ = this.sidebarService.isHovered$;
  }

  ngOnInit() {
    // Subscribe to router events
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.setActiveMenuFromRoute(this.router.url);
        }
      })
    );

    // Subscribe to combined observables to close submenus when all are false
    this.subscription.add(
      combineLatest([
        this.isExpanded$,
        this.isMobileOpen$,
        this.isHovered$,
      ]).subscribe(([isExpanded, isMobileOpen, isHovered]) => {
        if (!isExpanded && !isMobileOpen && !isHovered) {
          // this.openSubmenu = null;
          // this.savedSubMenuHeights = { ...this.subMenuHeights };
          // this.subMenuHeights = {};
          this.cdr.detectChanges();
        } else {
          // Restore saved heights when reopening
          // this.subMenuHeights = { ...this.savedSubMenuHeights };
          // this.cdr.detectChanges();
        }
      })
    );

    // Initial load
    this.setActiveMenuFromRoute(this.router.url);
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscription.unsubscribe();
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleSubmenu(section: string, index: number) {
    const key = `${section}-${index}`;

    if (this.openSubmenu === key) {
      this.openSubmenu = null;
      this.subMenuHeights[key] = 0;
    } else {
      this.openSubmenu = key;

      setTimeout(() => {
        const el = document.getElementById(key);
        if (el) {
          this.subMenuHeights[key] = el.scrollHeight;
          this.cdr.detectChanges(); // Ensure UI updates
        }
      });
    }
  }

  onSidebarMouseEnter() {
    this.isExpanded$
      .subscribe((expanded) => {
        if (!expanded) {
          this.sidebarService.setHovered(true);
        }
      })
      .unsubscribe();
  }

  private setActiveMenuFromRoute(currentUrl: string) {
    const menuGroups = [
      { items: this.navItems, prefix: "main" },
    ];

    menuGroups.forEach((group) => {
      group.items.forEach((nav, i) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (currentUrl === subItem.path) {
              const key = `${group.prefix}-${i}`;
              this.openSubmenu = key;

              setTimeout(() => {
                const el = document.getElementById(key);
                if (el) {
                  this.subMenuHeights[key] = el.scrollHeight;
                  this.cdr.detectChanges(); // Ensure UI updates
                }
              });
            }
          });
        }
      });
    });
  }

  onSubmenuClick() {
    console.log("click submenu");
    this.isMobileOpen$
      .subscribe((isMobile) => {
        if (isMobile) {
          this.sidebarService.setMobileOpen(false);
        }
      })
      .unsubscribe();
  }
}
