import classNames from 'classnames/bind';
import styles from './Items.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Items() {
    const [name, setName] = useState('');
    const [rank, setRank] = useState(1);
    const [category, setCategory] = useState('weapon');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const apiURL = import.meta.env.VITE_LIFEUP_API;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch(`${apiURL}/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    rank,
                    category,
                    description,
                    icon,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('✔ Item created successfully!');
                setLoading();
                setName('');
                setRank(1);
                setCategory('weapon');
                setDescription('');
                setIcon('');
            } else {
                setMessage('❌ Error: ' + data.error);
            }
        } catch (err) {
            setMessage('❌ API failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('item-page')}>
            <form
                onSubmit={handleSubmit}
                style={{ padding: 20, maxWidth: 350 }}
            >
                <h2>Form tạo item</h2>

                <label>
                    {'Name: '}
                    <input
                        type="text"
                        value={name}
                        placeholder="Item name..."
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <br />
                <br />

                <label>
                    {'Rank: '}
                    <select
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </label>

                <br />
                <br />

                <label>
                    {'Category: '}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="weapon">Weapon</option>
                        <option value="consumable">Consumable</option>
                        <option value="armor">Armor</option>
                        <option value="key">Key</option>
                        <option value="gift">Gift</option>
                        <option value="quest">Quest</option>
                        <option value="currency">Currency</option>
                        <option value="misc">Misc</option>
                    </select>
                </label>

                <br />
                <br />

                <label>
                    {'Desciption: '}
                    <textarea
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        rows={4}
                        cols={40}
                    />
                </label>

                <br />
                <br />

                <label>
                    {'Icon: '}
                    <input
                        type="text"
                        value={icon}
                        onChange={(e) => {
                            setIcon(e.target.value)
                        }}
                    />
                </label>

                <br />
                <br />

                <button className={cx('btn')} type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create item'}
                </button>

                {message && <p style={{ marginTop: 10 }}>{message}</p>}
            </form>
        </div>

        // <div style={{
        //         width: '100%',
        //         height: '100%',
        //         background:
        //             "url('https://i.pinimg.com/1200x/5c/8b/c8/5c8bc8fce7ddcefd521d8f2003fb179a.jpg') center center / cover no-repeat",
        //     }}>
        // </div>
    );
}

export default Items;
