import React from 'react';
import { useForm } from 'react-hook-form';

function SearchForm({ onSearch, setDomain, domain }) {

    function SearchForm({ onSearch, setDomain, domain }) {

        const { register, handleSubmit, formState: { errors } } = useForm();



        const onSubmit = (data) => {
            if (data.domain) {
                onSearch(data.domain);
            }
        };

        return (

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    {...register('domain', {
                        required: 'Domain is required',
                        pattern: {
                            value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                            message: 'Invalid domain name'
                        }
                    })}
                    placeholder="Enter domain (e.g., example.com)"
                    className="input"
                />
                {errors.domain && <p className="error">{errors.domain.message}</p>}
                <button type="submit" className="button">
                    Search
                </button>
            </form>
        );
    }

    export default SearchForm;
