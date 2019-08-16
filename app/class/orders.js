import util from '../class/util.js';
class Orders {
    getOrdersList(index) {

        return util.getMsg("http://localhost:8080/getOrderList", index)
    }
}
export default Orders;