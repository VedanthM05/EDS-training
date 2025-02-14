
export default async function decorate(block) {
    async function fetchData(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return { columns: [], data: [] };
        }
    }

    const apiUrl = 'http://localhost:3000/spreadsheet.json';
    const { columns, data } = await fetchData(apiUrl);

    if (data.length === 0) {
        block.innerHTML = '<p>No data available</p>';
        return;
    }

    let currentPage = 1;
    const itemsPerPage = 10;

    function renderTable(page) {
        block.innerHTML = ''; 

        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'table-wrapper';

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Create table header
        const headerRow = document.createElement('tr');
        columns.forEach((key) => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

    
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, data.length);

        
        for (let i = startIndex; i < endIndex; i++) {
            const row = data[i];
            const tr = document.createElement('tr');
            Object.values(row).forEach((value) => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        tableWrapper.appendChild(table);

        
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'pagination';

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = page === 1;
        prevButton.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable(currentPage);
            }
        };

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = endIndex >= data.length;
        nextButton.onclick = () => {
            if (endIndex < data.length) {
                currentPage++;
                renderTable(currentPage);
            }
        };

        paginationDiv.appendChild(prevButton);
        paginationDiv.appendChild(nextButton);
        tableWrapper.appendChild(paginationDiv);

        block.appendChild(tableWrapper);
    }

    renderTable(currentPage);
}
