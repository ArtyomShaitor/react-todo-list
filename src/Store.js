class Store
{
    getID()
    {
        const data = this.data.map( item => parseInt(item.id, 10));
        return data.length === 0 ? 1 : (Math.max.apply(null, data) + 1);
    }

    constructor(db)
    {
        this.database = db;
        this.data = this.loadDataFromDB();
        this.sync();
    }

    find = (id) =>
    {
        if (typeof id === 'undefined') {
            return [...this.data];
        }

        const list = this.data.filter( record => record.id && record.id === id);
        return list[0];
    };

    update = (id, data) =>
    {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
            }
        }

        if (index !== -1) {
            if (!data.id) {
                data.id = id;
            }
            this.data[index] = data;
            this.sync();
        }
    };

    remove = (id) =>
    {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
            }
        }

        if (index !== -1) {
            this.data.splice(index, 1);
            this.sync();
        }

        return index;
    };

    save = (record) =>
    {
        record.id = this.getID();

        this.data.push(record);
        this.sync();

        return record;
    };

    sync = () =>
    {
        localStorage.setItem(this.database, JSON.stringify(this.data));
    };

    loadDataFromDB = () =>
    {
        const data = JSON.parse(localStorage.getItem(this.database));
        return data || [];
    };
}

export default Store;