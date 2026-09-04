import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  ChevronLeft,
  Camera,
  Upload,
  Scale,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  MapPin,
  Search,
  Filter,
  RefreshCw,
  Save,
  X,
  Languages,
  Copy,
  Check,
  Clock,
  TrendingUp,
  Users,
  Package,
  Building2,
  Smartphone,
} from 'lucide-react';

export default function OfficerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('audit');
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showChallanModal, setShowChallanModal] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Tamil');
  const [searchTerm, setSearchTerm] = useState('');
  const [complianceFilter, setComplianceFilter] = useState('all');

  const fileInputRef = useRef(null);

  // Mock audit data
  const mockAuditData = {
    product: 'Sample Packaged Food',
    complianceScore: 55,
    inspectionDate: new Date().toISOString().split('T')[0],
    fields: {
      mrp: { value: '₹120.00', status: 'valid' },
      netQuantity: { value: '500g', status: 'valid' },
      mfgDate: { value: '01/08/2025', status: 'valid' },
      expiryDate: { value: '31/07/2026', status: 'valid' },
      consumerCare: { value: null, status: 'missing' },
      manufacturer: { value: 'Foods Pvt Ltd', status: 'valid' },
    },
    violations: [
      { rule: 'Rule 6(2)', severity: 'critical', message: 'Consumer care details not provided' },
      { rule: 'Rule 9(4)', severity: 'warning', message: 'Regional language declaration mismatch' },
    ],
    scaleCalibration: {
      reference: '₹10 Coin',
      diameterMM: 27,
      diameterPixels: 108,
      pxPerMM: 4,
      fontHeightMM: 2.5,
      minFontMM: 3.2,
      fontCompliant: false,
    },
    languages: {
      english: 'Net Qty: 500g | MRP: ₹120',
      hindi: 'मात्रा: 500ग्राम | मूल्य: ₹120',
      regional: 'அளவு: 500கிராம் | விலை: ₹120',
    },
  };

  // Mock history data
  const mockHistory = [
    { id: 1, product: 'Biscuit Pack', brand: 'Britannia', compliance: 'VIOLATION', location: 'Mumbai', date: '2026-09-01' },
    { id: 2, product: 'Juice Bottle', brand: 'Real', compliance: 'PASS', location: 'Delhi', date: '2026-08-31' },
    { id: 3, product: 'Chips Packet', brand: "Lay's", compliance: 'WARNING', location: 'Chennai', date: '2026-08-30' },
    { id: 4, product: 'Chocolate Bar', brand: 'Cadbury', compliance: 'PASS', location: 'Kolkata', date: '2026-08-29' },
    { id: 5, product: 'Instant Noodles', brand: 'Maggi', compliance: 'VIOLATION', location: 'Mumbai', date: '2026-08-28' },
    { id: 6, product: 'Tea Pack', brand: 'Tata', compliance: 'PASS', location: 'Delhi', date: '2026-08-27' },
    { id: 7, product: 'Soap Bar', brand: 'Lifebuoy', compliance: 'WARNING', location: 'Mumbai', date: '2026-08-26' },
    { id: 8, product: 'Shampoo', brand: 'Dove', compliance: 'PASS', location: 'Chennai', date: '2026-08-25' },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setIsAnalyzing(true);
        setTimeout(() => {
          setAuditResult(mockAuditData);
          setIsAnalyzing(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScaleSave = () => {
    setAuditResult({ ...auditResult, scaleCalibration: { ...auditResult.scaleCalibration, fontCompliant: true } });
  };

  const filteredHistory = mockHistory.filter((item) => {
    const matchesSearch =
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = complianceFilter === 'all' || item.compliance === complianceFilter;
    return matchesSearch && matchesFilter;
  });

  const offlineToggle = () => {
    // Simulate offline mode toggle (shown as static for now)
    alert('Offline mode is available. Would you like to enable local queue?');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-lg transition">
                <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Officer Workbench</h1>
                <p className="text-xs text-slate-500">Legal Metrology Enforcement</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Online - Live Sync
              </div>
              <button
                onClick={offlineToggle}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold hover:bg-gray-200 transition"
              >
                📴 Offline Mode
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                activeTab === 'audit' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔍 Active Audit
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📊 History & Analytics
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'audit' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column – Image & Calibration */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Image Preview & Calibration</h2>

                {!image ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-blue-500 transition">
                    <Camera className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Capture or upload package image</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
                    >
                      <Upload className="w-5 h-5" />
                      Upload / Capture
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden">
                      <img src={image} alt="Audit image" className="w-full h-64 object-cover" />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full"></div>
                        </div>
                      )}
                    </div>

                    {auditResult && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h3 className="font-semibold text-slate-900 mb-2">Scale Calibration</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Reference Object</span>
                            <span className="font-medium">₹10 Coin (27mm)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Measured Diameter</span>
                            <span className="font-medium">{auditResult.scaleCalibration.diameterPixels}px</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Pixel-to-mm Ratio</span>
                            <span className="font-medium">{auditResult.scaleCalibration.pxPerMM}px/mm</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Font Height Detected</span>
                            <span className="font-medium">{auditResult.scaleCalibration.fontHeightMM}mm</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Required Minimum</span>
                            <span className="font-medium">{auditResult.scaleCalibration.minFontMM}mm</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-sm font-semibold ${
                              auditResult.scaleCalibration.fontCompliant ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {auditResult.scaleCalibration.fontCompliant ? '✓ Compliant' : '✗ Non-compliant'}
                            </span>
                            {!auditResult.scaleCalibration.fontCompliant && (
                              <button
                                onClick={handleScaleSave}
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700"
                              >
                                Confirm Scale
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Date Engine */}
              {auditResult && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Dynamic Date Engine</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500">Inspection Date (Today)</p>
                      <p className="font-semibold text-slate-900">{auditResult.inspectionDate}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500">Manufacturing Date</p>
                      <p className="font-semibold text-slate-900">{auditResult.fields.mfgDate.value}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500">Expiry / Best Before</p>
                      <p className="font-semibold text-slate-900">{auditResult.fields.expiryDate.value}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500">Days Remaining</p>
                      <p className="font-semibold text-slate-900">
                        {new Date(auditResult.fields.expiryDate.value).getTime() - new Date(auditResult.inspectionDate).getTime() > 0 ? 'Valid' : 'Expired'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
                    ⚠ Expiry warning: Product has 25 days remaining before expiry. Next inspection recommended before that date.
                  </div>
                </div>
              )}

              {/* Language Diff */}
              {auditResult && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Languages className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Indic Script Comparison</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">English (Mandatory)</p>
                      <p className="text-sm font-medium">{auditResult.languages.english}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Hindi (Mandatory)</p>
                      <p className="text-sm font-medium">{auditResult.languages.hindi}</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Regional Language (Tamil – Required by Rule 9(4))</p>
                      <p className="text-sm font-medium">{auditResult.languages.regional}</p>
                      <p className="text-xs text-red-600 mt-2">⚠ Mismatch detected – Regional declaration does not match English/Hindi</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLanguageModal(true)}
                    className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700"
                  >
                    View Diff Details
                  </button>
                </div>
              )}

              {/* Actions */}
              {auditResult && (
                <div className="flex gap-3">
                  <button
                    onClick={() => alert('Saved to local queue!')}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save to Local Queue
                  </button>
                  <button
                    onClick={() => setShowChallanModal(true)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <FileCheck className="w-5 h-5" />
                    Generate PDF Challan
                  </button>
                </div>
              )}
            </div>

            {/* Right Column – Results Summary */}
            <div className="space-y-6">
              {auditResult && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Inspection Summary</h2>
                  <div className={`mb-4 p-4 rounded-xl ${
                    auditResult.complianceScore >= 80 ? 'bg-green-50' :
                    auditResult.complianceScore >= 50 ? 'bg-yellow-50' :
                    'bg-red-50'
                  }`}>
                    <div className="text-center">
                      <span className="text-4xl font-bold text-slate-900">{auditResult.complianceScore}%</span>
                      <p className="text-sm text-slate-500">Compliance Score</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {auditResult.violations.map((violation, index) => (
                      <div key={index} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`w-5 h-5 ${
                            violation.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'
                          }`} />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{violation.message}</p>
                            <span className="text-xs text-slate-500">{violation.rule}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {auditResult.violations.length === 0 && (
                    <div className="p-3 bg-green-50 rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <p className="text-sm text-green-700">No violations found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={TrendingUp} label="Total Audits" value="1,245" color="blue" />
              <StatCard icon={AlertTriangle} label="Repeat Violators Flagged" value="37" color="red" />
              <StatCard icon={Users} label="Active Citizen Complaints" value="158" color="yellow" />
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by product, brand, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={complianceFilter}
                  onChange={(e) => setComplianceFilter(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="PASS">PASS</option>
                  <option value="WARNING">WARNING</option>
                  <option value="VIOLATION">VIOLATION</option>
                </select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Product</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Brand</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Compliance</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Location</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">{item.product}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{item.brand}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.compliance === 'PASS' ? 'bg-green-100 text-green-700' :
                            item.compliance === 'WARNING' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {item.compliance}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          {item.location}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Violation Heat Map Placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Violation Hotspots (Heat Map)</h2>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Hyderabad', 'Bangalore', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi', 'Nagpur'].map((city, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl text-center ${
                      idx === 0 ? 'bg-red-100 text-red-700' :
                      idx === 2 || idx === 4 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}
                  >
                    <p className="font-semibold text-sm">{city}</p>
                    <p className="text-xs">{idx === 0 ? 'High' : idx === 2 || idx === 4 ? 'Medium' : 'Low'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Challan Modal */}
      {showChallanModal && auditResult && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Inspection Challan Summary</h3>
              <button onClick={() => setShowChallanModal(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">Product</p>
                <p className="font-semibold text-slate-900">{auditResult.product}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500">Inspection Date</p>
                  <p className="font-semibold text-slate-900">{auditResult.inspectionDate}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500">Score</p>
                  <p className="font-semibold text-slate-900">{auditResult.complianceScore}%</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-slate-900 mb-2">Violations</h4>
                <ul className="space-y-2">
                  {auditResult.violations.map((violation, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                        violation.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      <div>
                        <p className="text-slate-700">{violation.message}</p>
                        <span className="text-xs text-slate-500">{violation.rule}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => alert('PDF Challan generated and saved!')}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <FileCheck className="w-5 h-5" />
                Download Challan PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Diff Modal */}
      {showLanguageModal && auditResult && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Language Diff – Rule 9(4) Verification</h3>
              <button onClick={() => setShowLanguageModal(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(auditResult.languages).map(([lang, text]) => (
                <div key={lang} className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">{lang}</p>
                  <p className="text-sm">{text}</p>
                </div>
              ))}
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-700">
                ⚠ Declaration mismatch detected. Under Rule 9(4), all mandatory declarations must be in English, Hindi, and the regional language of the state where the product is sold.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-3 ${colors[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}