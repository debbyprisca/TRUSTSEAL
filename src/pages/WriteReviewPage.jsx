// 
import { useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import debounce from "lodash/debounce";
import { useParams } from "react-router-dom";




const { id } = useParams();
console.log("Reviewing Institution ID:", id);


const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInstitutions = debounce(async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/api/institutions?search=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching institutions:", error);
    }
    setLoading(false);
  }, 300); // Debounced for performance

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchInstitutions(value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search institutions..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-4 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-48 focus:w-64"
      />
      {loading && <div className="absolute w-full text-gray-500 text-sm mt-1">Loading...</div>}
      {results.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-md shadow-md mt-1 max-h-40 overflow-auto">
          {results.map((inst) => (
            <li
              key={inst.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setSearchTerm(inst.name)}
            >
              {inst.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default WriteReviewPage;