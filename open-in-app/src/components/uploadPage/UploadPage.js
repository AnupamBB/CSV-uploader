import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './UploadPage.scss';
import profile from "../../assets/logos/profile.png"
import category from "../../assets/icons/Category.png"
import Calendar from "../../assets/icons/Calendar.png"
import Chart from "../../assets/icons/Chart.png"
import Document from "../../assets/icons/Document.png"
import Notification from "../../assets/icons/Notification.png"
import Setting from "../../assets/icons/Setting.png"
import Ticket from "../../assets/icons/Ticket.png"

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [excelData, setExcelData] = useState([]);
    const [showExcelData, setShowExcelData] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const [tagString, setTagString] = useState('');
    const [tags, setTags] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleDropdown = (index) => {
        if (openDropdownIndex === index) {
            setOpenDropdownIndex(null);
        } else {
            setOpenDropdownIndex(index);
        }
    };

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };



    const removeTag = (rowIndex, tagToRemove) => {
        const newExcelData = [...excelData];
        const tags = newExcelData[rowIndex].tags.split(', ').filter(tag => tag !== tagToRemove);
        newExcelData[rowIndex].tags = tags.join(', ');
        setExcelData(newExcelData);
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            readExcel(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            readExcel(file);
        }
    };

    const readExcel = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const buffer = e.target.result;
            const wb = XLSX.read(buffer, { type: 'buffer' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            if (data && data[0] && data[0]['select tags']) {
                const tagsString = data[0]['select tags'];
                setTagString(tagsString); // Set the string
                const tagsArray = tagsString.split(',').map(tag => tag.trim()); // Create array from string
                setTags(tagsArray); // Set the array
            }

            setExcelData(data);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            console.log('Uploading', selectedFile);
            setShowExcelData(true)
        }
    };
    const handleTagSelection = (rowIndex, tag) => {
        const newExcelData = [...excelData];
        const tags = newExcelData[rowIndex].tags ? newExcelData[rowIndex].tags.split(', ') : [];
        if (!tags.includes(tag)) {
            tags.push(tag);
            newExcelData[rowIndex].tags = tags.join(', ');
            setExcelData(newExcelData);
        }
    };




    return (
        <div className="container mx-auto px-4">
            <div className='main-container'>
                <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                    <div className="logo">
                        <svg className="logo-svg" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M41.9998 21.0966L42 21C42 9.40202 32.598 0 21 0C10.1757 0 1.26409 8.18954 0.123364 18.7105L11.79 24.4142C12.3617 23.6184 13.2953 23.1 14.35 23.1C15.2427 23.1 16.0487 23.4714 16.6219 24.068L25.9002 16.4134C25.9198 14.6906 27.3225 13.3 29.05 13.3C30.6572 13.3 31.9833 14.5037 32.1759 16.0587L41.9998 21.0966ZM17.4857 25.9482L26.5994 18.4294C27.1769 19.1434 28.0601 19.6 29.05 19.6C30.1912 19.6 31.1907 18.9931 31.7433 18.0845L41.8775 23.2815C40.7404 33.8063 31.8271 42 21 42C9.40202 42 0 32.598 0 21C0 20.9588 0.000118391 20.9177 0.000354851 20.8766L11.2016 26.3528C11.2559 28.0449 12.6447 29.4 14.35 29.4C16.0897 29.4 17.5 27.9897 17.5 26.25C17.5 26.1482 17.4952 26.0475 17.4857 25.9482Z" fill="#605BFF"/>
                        </svg>
                        <div>Base</div>
                    </div>
                    <nav className="left-pannel-container">
                        <ul className="left-pannel">
                            <div className='left-pannel-options'>
                                <img className="left-pannel-options-icons" src={category} alt="" />
                                <div>Dashboard</div>
                            </div>
                            <div className='left-pannel-options'>
                                <img className="left-pannel-options-icons" src={Chart} alt="" />
                                <div>Upload</div>
                            </div>
                            <div className='left-pannel-options'>
                                <img className="left-pannel-options-icons" src={Ticket} alt="" />
                                <div>Invoice</div>
                            </div>
                            <div className='left-pannel-options'>
                                <img className="left-pannel-options-icons" src={Document} alt="" />
                                <div>Schedule</div>
                            </div>
                            <div className='left-pannel-options'>
                                <img className="left-pannel-options-icons" src={Calendar} alt="" />
                                <div>Calendar</div>
                            </div>
                            <div className='left-pannel-options'>
                                <img className="left-pannel-options-icons" src={Notification} alt="" />
                                <div>Notification</div>
                            </div>
                            <div className='left-pannel-options'>
                                <img className="left-pannel-options-icons" src={Setting} alt="" />
                                <div>Settings</div>
                            </div>
                        </ul>
                    </nav>
                </aside>

                <div className="right-pannel">
                    <div className="header-container">
                        <button onClick={toggleSidebar} className="sidebar-toggle">
                            <i className="fas fa-bars">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                                    <path d="M1 1H17M1 13H17M1 7H17" stroke="#231F20" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </i> {/* Icon for the menu button */}
                        </button>
                        <div className="page-title">Upload CSV</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="23" viewBox="0 0 19 23" fill="none">
                            <path d="M16.3862 13.3255V9.20108C16.3862 5.5011 14.2012 2.38423 11.2412 1.44687C10.9482 0.59807 10.2322 0 9.38623 0C8.54023 0 7.82423 0.59807 7.53123 1.44687C4.57123 2.38538 2.38623 5.5011 2.38623 9.20108V13.3255L0.679231 15.2887C0.586189 15.3954 0.512401 15.5221 0.462116 15.6617C0.411831 15.8012 0.386041 15.9508 0.386232 16.1019V18.4022C0.386232 18.7072 0.491588 18.9997 0.679125 19.2154C0.866661 19.4311 1.12102 19.5523 1.38623 19.5523H17.3862C17.6514 19.5523 17.9058 19.4311 18.0933 19.2154C18.2809 18.9997 18.3862 18.7072 18.3862 18.4022V16.1019C18.3864 15.9508 18.3606 15.8012 18.3103 15.6617C18.2601 15.5221 18.1863 15.3954 18.0932 15.2887L16.3862 13.3255ZM16.3862 17.252H2.38623V16.578L4.09323 14.6148C4.18627 14.5081 4.26006 14.3814 4.31035 14.2419C4.36063 14.1023 4.38642 13.9527 4.38623 13.8016V9.20108C4.38623 6.03016 6.62923 3.45041 9.38623 3.45041C12.1432 3.45041 14.3862 6.03016 14.3862 9.20108V13.8016C14.3862 14.1076 14.4912 14.3997 14.6792 14.6148L16.3862 16.578V17.252ZM9.38623 23.0027C10.0055 23.0036 10.6097 22.7826 11.1147 22.3703C11.6198 21.9581 12.0006 21.3751 12.2042 20.7024H6.56823C6.77189 21.3751 7.15271 21.9581 7.65774 22.3703C8.16277 22.7826 8.76693 23.0036 9.38623 23.0027Z" fill="black"/>
                        </svg>
                        <img className="profile" src={profile} alt="" />

                    </div>
                    <div className='upload-file-container'>
                        <section className="upload-area">
                            <div className="dropzone"
                                 onDragOver={handleDragOver}
                                 onDrop={handleDrop}
                                 onClick={() => document.getElementById('fileInput').click()}
                            >
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <div className="file-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
                                        <g clip-path="url(#clip0_22_2725)">
                                            <path d="M18.7801 13.2998L6.95557 11.1998V26.7167C6.95557 27.4253 7.52638 27.9998 8.23053 27.9998H28.6341C29.3382 27.9998 29.9091 27.4253 29.9091 26.7167V20.9998L18.7801 13.2998Z" fill="#185C37"/>
                                            <path d="M18.7802 0H8.23059C7.52644 0 6.95563 0.57446 6.95563 1.2831V7L18.7802 14L25.0402 16.1L29.9091 14V7L18.7802 0Z" fill="#21A366"/>
                                            <path d="M6.95563 7H18.7802V14H6.95563V7Z" fill="#107C41"/>
                                            <path opacity="0.1" d="M15.4185 5.60049H6.95557V23.1005H15.4185C16.1216 23.0982 16.6911 22.5251 16.6934 21.8174V6.88359C16.6911 6.17591 16.1216 5.60279 15.4185 5.60049Z" fill="black"/>
                                            <path opacity="0.2" d="M14.7229 6.30025H6.95557V23.8002H14.7229C15.4261 23.7979 15.9956 23.2248 15.9978 22.5171V7.58334C15.9956 6.87567 15.4261 6.30255 14.7229 6.30025Z" fill="black"/>
                                            <path opacity="0.2" d="M14.7229 6.30025H6.95557V22.4002H14.7229C15.4261 22.3979 15.9956 21.8248 15.9978 21.1172V7.58334C15.9956 6.87567 15.4261 6.30255 14.7229 6.30025Z" fill="black"/>
                                            <path opacity="0.2" d="M14.0273 6.30025H6.95557V22.4002H14.0273C14.7305 22.3979 15.3 21.8248 15.3023 21.1172V7.58334C15.3 6.87567 14.7305 6.30255 14.0273 6.30025Z" fill="black"/>
                                            <path d="M1.27496 6.30025H14.0274C14.7315 6.30025 15.3023 6.87471 15.3023 7.58334V20.4171C15.3023 21.1258 14.7315 21.7002 14.0274 21.7002H1.27496C0.570817 21.7002 0 21.1258 0 20.4171V7.58334C0 6.87471 0.570817 6.30025 1.27496 6.30025Z" fill="url(#paint0_linear_22_2725)"/>
                                            <path d="M3.94867 18.1706L6.63075 13.9881L4.17334 9.82869H6.15011L7.49115 12.4887C7.61497 12.7414 7.69982 12.929 7.74574 13.0529H7.76312C7.85123 12.8513 7.94397 12.6555 8.04135 12.4656L9.47489 9.8301H11.2896L8.76959 13.965L11.3536 18.1706H9.42274L7.87372 15.2509C7.80075 15.1267 7.73884 14.9962 7.68871 14.861H7.66576C7.62038 14.9934 7.56018 15.1203 7.4863 15.239L5.89138 18.1706H3.94867Z" fill="white"/>
                                            <path d="M28.6342 0H18.7802V7H29.9091V1.2831C29.9091 0.57446 29.3383 0 28.6342 0Z" fill="#33C481"/>
                                            <path d="M18.7802 14H29.9091V21H18.7802V14Z" fill="#107C41"/>
                                        </g>
                                        <defs>
                                            <linearGradient id="paint0_linear_22_2725" x1="2.65832" y1="5.29766" x2="12.7396" y2="22.6473" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#18884F"/>
                                                <stop offset="0.5" stop-color="#117E43"/>
                                                <stop offset="1" stop-color="#0B6631"/>
                                            </linearGradient>
                                            <clipPath id="clip0_22_2725">
                                                <rect width="29.9091" height="28" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <p>Drop your excel sheet here or <span className="browse-link">browse</span></p>
                            </div>
                            <button className="upload-button" onClick={handleUpload}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M19.125 14.1923V16.9327C19.125 18.1435 18.1435 19.125 16.9327 19.125H7.06731C5.85653 19.125 4.875 18.1435 4.875 16.9327V14.1923M12 15.8365V4.875M12 4.875L8.71154 8.16346M12 4.875L15.2885 8.16346" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <div>Upload</div>
                            </button>
                        </section>
                    </div>
                    <footer className="footer">
                        <p>Uploads</p>
                    </footer>
                    <div>
                        {showExcelData && excelData.length > 0 && (
                            <div className="excel-data-container">
                                <table className="excel-table">
                                    <thead>
                                    <tr className="excel-table-rows">
                                        {Object.keys(excelData[0]).slice(0, 3).map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                        <th>Add Tags</th> {/* New column header */}
                                        <th>Selected Tags</th> {/* New column header */}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {excelData.map((row, rowIndex) => (
                                        <tr className='excel-table-data-rows-rounded' key={rowIndex}>
                                            {Object.values(row).slice(0, 3).map((cell, cellIndex) => {
                                                if (cellIndex === 1) {
                                                    return (
                                                        <td key={cellIndex}>
                                                            <a href={cell} style={{ textDecoration: 'underline' }}>
                                                                {cell}
                                                            </a>
                                                        </td>
                                                    );
                                                }
                                                return <td key={cellIndex}>{cell}</td>;
                                            })}
                                            <td className="add-tags-cell">
                                                <div className="tag-selector">
                                                    <button onClick={() => toggleDropdown(rowIndex)} className="dropdown-button">
                                                        Select Tags <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                        <path d="M13 5.75L8.5 10.25L4 5.75" stroke="#999CA0" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    </button>
                                                    {openDropdownIndex === rowIndex && (
                                                        <div className="dropdown-menu">
                                                            {tags.map((tag, tagIndex) => (
                                                                <div className="selected" key={tagIndex} onClick={() => handleTagClick(tag)}>
                                                                    {tag}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className=''><div className="selected-tags">
                                                {selectedTags.map((tag, index) => (
                                                    <div key={index} className="tag">
                                                        {tag}
                                                        <span className="delete-tag" onClick={() => removeTag(tag)}>&times;</span>
                                                    </div>
                                                ))}
                                            </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UploadPage;
