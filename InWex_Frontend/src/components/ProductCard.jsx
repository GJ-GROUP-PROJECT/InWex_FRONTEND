import { Package, Calendar, Barcode, DollarSign, Edit, Trash2, Eye } from "lucide-react";

const ProductCard = ({ product }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const profitMargin = ((product.selling_price - product.cost_price) / product.cost_price * 100).toFixed(1);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
            {/* Product Image */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />
                ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                        <Package className="h-16 w-16 text-gray-400" />
                    </div>
                )}
                {/* Profit Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${profitMargin > 30 ? 'bg-green-100 text-green-800' :
                    profitMargin > 15 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    +{profitMargin}%
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4">
                {/* Header */}
                <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                    </p>
                </div>

                {/* SKU and Barcode */}
                <div className="mb-3 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                        <Package className="h-4 w-4 mr-2" />
                        <span className="font-mono font-medium">{product.sku}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Barcode className="h-4 w-4 mr-2" />
                        <span className="font-mono">{product.barcode}</span>
                    </div>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-sm text-gray-500">Selling Price</p>
                            <p className="text-xl font-bold text-green-600">
                                {formatPrice(product.selling_price)}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Cost Price</p>
                            <p className="text-lg font-semibold text-gray-700">
                                {formatPrice(product.cost_price)}
                            </p>
                        </div>
                    </div>

                    {/* Unit of Measure */}
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            per {product.unit_of_measure}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            Added {formatDate(product.created_at)}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                            <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-green-600">
                            ₹{(product.selling_price - product.cost_price).toFixed(0)} profit
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard