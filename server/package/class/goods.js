import utils from './util';
class Goods {
    getGoodsList(index) {
        {
            return utils.getMsg('http://localhost:8080/goodsInfoList', index);
        }
    }
    insertGoodInfo(data) {
        return utils.postMsg("http://localhost:8080/InsertGoodInfo", JSON.stringify(data))
    }
    updateGoodInfo(data) {
        return utils.postMsg("http://localhost:8080/UpdateGoodInfo", JSON.stringify(data))
    }
}
export default Goods;