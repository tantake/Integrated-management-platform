import utils from './util';
class Brands {
    getBrandsList(index) {
        {
            return utils.getMsg('http://localhost:8080/brandInfoList', index);
        }
    }
    insertBrandsInfo(data) {
        return utils.postMsg("http://localhost:8080/insertBrandInfo", JSON.stringify(data))
    }
    updateBrandsInfo(data) {
        return utils.postMsg("http://localhost:8080/updateBrandInfo", JSON.stringify(data))
    }
}
export default Brands;