import InOutBoundSegment from "./dashboard/in-outbound";
import RevenueSegment from "./dashboard/revenue";
import NotFoundPage from "./not-found";
import OfflineOrderSegment from "./order/offline";
import OnlineOrderSegment from "./order/online";
import WareHouseSegment from "./warehouse";



export default function StaffPage({ params }: { params: { slug: string[] } }) {
    switch (params.slug.at(0)) {
        case 'warehouse': {
            return <WareHouseSegment />
        }
        case 'dashboard': {
            switch (params.slug[1]) {
                case 'revenue':
                    return <RevenueSegment />
                case 'in-outbound':
                    return <InOutBoundSegment />
            }
        }
        case 'order': {
            switch (params.slug[1]) {
                case 'revenue':
                    return <OnlineOrderSegment />
                case 'in-outbound':
                    return <OfflineOrderSegment />
            }
        }
        default:
            return <NotFoundPage />
    }

};
