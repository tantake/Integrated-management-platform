import utils from './util';
class Catalogs {
    getCatalogList(index) {
        {
            return utils.getMsg('http://localhost:8080/catalogInfoList', index);
        }
    }
    insertCatalogInfo(data) {
        return utils.postMsg("http://localhost:8080/insertCatalogInfo", JSON.stringify(data))
    }
    updateCatalogInfo(data) {
        return utils.postMsg("http://localhost:8080/updateCatalogInfo", JSON.stringify(data))
    }
}
export default Catalogs;