import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiFillYoutube } from "react-icons/ai"
import { RiBarChartBoxLine, RiBarChartLine, RiFileSearchLine, RiPagesLine, RiQuestionAnswerFill, RiSearchLine, RiSettings5Line, RiSlideshowLine, RiTodoLine, RiZoomInLine } from "react-icons/ri"

const MenuData = {
  ISSUE_TREND: [
    {
      serviceName: "Dashboard",
      serviceIcon: <RiSlideshowLine size={20} color="#666" />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
  ],
  PORTAL: [
    {
      serviceName: "네이버",
      serviceIcon: null,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
    {
      serviceName: "다음",
      serviceIcon: null,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
    {
      serviceName: "구글",
      serviceIcon: null,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    }
  ],
  SNS: [
    {
      serviceName: "인스타그램",
      serviceIcon: <AiFillInstagram color="#E1306C" size={24} />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
    {
      serviceName: "페이스북",
      serviceIcon: <AiFillFacebook color="#4267B2" size={24} />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
    {
      serviceName: "트위터",
      serviceIcon: <AiFillTwitterSquare color="#1DA1F2" size={24} />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
    {
      serviceName: "유튜브",
      serviceIcon: <AiFillYoutube color="#FF0000" size={24} />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    }
  ],
  COMMUNITY: [
    {
      serviceName: "커뮤니티",
      serviceIcon: <RiQuestionAnswerFill size={20} color="#666" />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
  ],
  INFO: [
    {
      serviceName: "키워드 검색 수",
      serviceIcon: <RiFileSearchLine size={20} color="#666" />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
  ],
  INTENSE: [
    {
      serviceName: "통합 검색",
      serviceIcon: <RiZoomInLine size={20} color="#666" />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
    {
      serviceName: "Report",
      serviceIcon: <RiTodoLine size={20} color="#666" />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
    {
      serviceName: "트렌드 분석",
      serviceIcon: <RiBarChartBoxLine size={20} color="#666" />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
    {
      serviceName: "기타",
      serviceIcon: <RiPagesLine size={20} color="#666" />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
  ],
  MANAGEMENT: [
    {
      serviceName: "키워드 검색 수",
      serviceIcon: <RiSettings5Line size={20} color="#666" />,
      hasRealTimeData: true,
      hasAnalysisMenu: true,
      hasRealTimeDataMenu: true,
      hasSearchResultMenu: true,
      hasNewComingDataMenu: true
    },
  ],

}

export default MenuData