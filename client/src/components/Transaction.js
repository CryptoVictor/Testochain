// Copyright (c) 2022 Victor Garcia | Special Thanks: David Joseph Katz
// Distributed under the MIT software license, see the accompanying
// file LICENSE.txt or https://opensource.org/licenses/MIT

import React from 'react';

const Transaction = ({transaction}) => {

    const {input, outputMap} = transaction;
    const recipients = Object.keys(outputMap);

    return (
        <div className='Transaction'>
            <div>From: {`${input.address.substring(0,20)}...`} | Balance: {input.amount}</div>
            {
                recipients.map(recipient => (
                    <div key={recipient}>
                        To: {`${recipient.substring(0,20)}...`} | Sent: {outputMap[recipient]}
                    </div>
                ))
            }
        </div>
    );
}

export default Transaction;
