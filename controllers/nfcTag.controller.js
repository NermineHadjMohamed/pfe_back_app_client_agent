const { fetchProductByNfcTag } = require('../services/nfcTag.service');

const getProductByNfcTag = async (req, res) => {
    const { nfcTagId } = req.params; 
    const agentId = req.agentId; 

    try {
        
        const products = await fetchProductByNfcTag({ tagId: nfcTagId });
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error fetching product by NFC tag:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};


module.exports = {
    getProductByNfcTag,
};
