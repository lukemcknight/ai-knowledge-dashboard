import { useEffect, useState } from "react"
import { getArticles } from "../api/api";
import { sendFile } from '../api/api.js';
import { Upload, Search, Loader2 } from 'lucide-react';

export default function Sidebar() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const response = await getArticles();
                setArticles(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchResponse();
    }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setUploading(true);

        try {
            await uploadFile(file);
            const response = await getArticles();
            setArticles(response);
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setUploading(false);
            setSelectedFile(null);
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        await sendFile(formData)
    }

    const filteredArticles = articles.filter(article =>
        article.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <aside className="hidden md:flex w-72 bg-secondary rounded-3xl ml-4 my-4 flex-col p-6">
            <h2 className="text-lg font-semibold text-secondary-foreground mb-4">Documents</h2>

            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-foreground/70" size={16} />
                <input
                    type="search"
                    id="file_input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documents..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-background/10 border border-background/20 text-secondary-foreground placeholder-secondary-foreground/60 focus:ring-2 focus:ring-background/30 focus:border-background/40 outline-none transition-all"
                />
            </div>

            <div className="text-xs text-secondary-foreground/70 mb-3">
                {loading ? "Loading..." : `${filteredArticles.length} file${filteredArticles.length !== 1 ? 's' : ''}`}
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-5 h-5 animate-spin text-secondary-foreground/70" />
                    </div>
                ) : filteredArticles.length === 0 ? (
                    <div className="text-center py-12 text-secondary-foreground/70 text-sm">
                        {searchQuery ? "No documents found" : "No documents yet"}
                    </div>
                ) : (
                    filteredArticles.map((article, index) => (
                        <div
                            key={index}
                            className="p-3 rounded-lg bg-background/10 hover:bg-background/20 cursor-pointer transition-colors"
                        >
                            <p className="text-sm font-medium text-secondary-foreground truncate">
                                {article}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-background/20">
                <label
                    htmlFor="fileInput"
                    className={`flex items-center justify-center gap-2 cursor-pointer text-secondary-foreground bg-background/10 hover:bg-background/20 font-medium rounded-lg h-12 transition-all duration-200 w-full ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {uploading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Uploading...</span>
                        </>
                    ) : (
                        <>
                            <Upload size={16} />
                            <span>Upload File</span>
                        </>
                    )}
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>
            </div>
        </aside>
    )
}
