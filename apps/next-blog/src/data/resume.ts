export const workExperienceData = [
  {
    title: "스마트스코어",
    date: "2023.04 - 2024.09",
    position: "Frontend Engineer",
    description: `스마트스코어는 골프 관련 데이터와 서비스를 제공하는 플랫폼
                기업입니다.
                20개 이상의 서비스가 운영되고 있으며, 각 서비스들은 스코어
                데이터 등 골프와 관련된 데이터 중심으로 긴밀하게 연결되어
                있습니다.`,
    projects: [
      {
        title: "라이브스코어",
        date: "23.11 - 24.08",
        description:
          "골프장에 참여한 플레이어들만 볼 수 있었던 리더보드, 실시간 스코어 등을 라이브스코어 방에 참여한 누구나 보고 소통할 수있도록 만든 서비스입니다.",

        sub_description: [
          " 스마트스코어 앱의 [라운드 정보 제공] 서비스에서 사용되는 기존 스코어 정보 API를 기반으로 라이브스코어 컴포넌트 및 권한별 로직 설계",
          "골프장에서 실시간으로 변경되는 스코어 정보와, 초대, 강퇴, 참여 인원수 초과 등 라이브스코어 방에서의 상호작용에 대한 처리 로직 (eg. toast) 설계 및 구현",
        ],
        techStack: "Vue2 | Vuex | Webview",
      },
      {
        title: `스마트스코어\n스토어`,
        date: "23.08 - 23.12",
        description:
          "스마트스코어 체험형 매장의 o2o 서비스로, 매장 안내 및 미니게임, 시타정보를 제공하는 서비스입니다.",
        sub_description: [
          "기존 스마트스코어 웹앱에서 벗어나 독립적인 웹뷰로 구성하여 로딩시간 단축",
          "독립적인 웹뷰로 구성하기 위한 Native bridge interface 설계",
          "SSR (Nuxt3) 도입으로 초기 로딩 속도 개선",
          "useAsyncData를 랩핑한 data fetching 모듈 개발",
        ],
        techStack: "Vue3 | Nuxt3 | Typescript | Webview | Pinia | scss",
      },
      {
        title: "마제스티",
        date: "23.04 - 23.09",
        description: "기존 마제스티 홈페이지의 리뉴얼 프로젝트입니다.",
        sub_description: [
          "Lerna를 활용하여 모노레포 구축, Nx를 사용하여 Task의 순서 및 의존성 관리",
          "적응형 web, mobile, admin 페이지 개발",
          "이미지 업로드, 에디터, 비디오 처리, 애니메이션, carousel 등의 기능 구현",
          "다국어 지원",
        ],
        techStack: "Vue3 | Typescript | Pinia | Lerna | nx | i18n | scss",
      },
    ],
  },

  {
    title: "블루코어",
    date: "2021.03 - 2022.07",
    position: "FullStack Engineer",
    description: `SI / Solution`,
    projects: [
      {
        title: `항저우\n아시안게임\nGMS`,
        date: "21.03 - 22.07",
        description: `GMS(Game Management System)는 특정 행사가 운영되는 동안 [유니폼, 교통, 항공, 의료, 의전] 등 대회 전반에 걸쳐 지원되는 서비스를 효율적으로 운영하기 위한 관리 시스템입니다.
        항저우 아시안게임 GMS의 유니폼 관리(UNM uniform management)와 교통 관리(TRA transportation) 시스템을 맡아 개발 및 협업하였습니다.
        `,

        sub_description: [
          "공급업체 주관 테스트(Supplier Test), DAT(Data Acceptance Test), UAT(User Acceptance Test) 세 번 이상의 강도높은 테스트 진행",
          "교통관리(TRA) 시스템 - DB 스키마 설계 및 비즈니스 로직 구현",
          "유니폼 관리(UNM) 시스템 - GMS 시스템 내 물류, 의전, 게임(경기) 등 타 시스템과 연동 및 동기화 작업, 유니폼 박스 스캐닝 등 물류 관리 기능 구현",
        ],
        techStack: "Vue2 | Java | Spring boot | MySQL",
      },
    ],
  },
];
