/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render, screen, fireEvent} from '@testing-library/react-native';
// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import storage from '../storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';

it('checks if Async Storage is used', async () => {
  const test_storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
      // we'll talk about the details later.
    },
  });

  let temp = [];

  for (let i = 0; i < 3; i++) {
    temp.push({
      name: `Card${i + 1}`,
      image: `file${i + 1}`,
    });
  }

  await test_storage.save({
    key: 'Test Cards',
    id: 1000,
    data: temp,
  });

  const data = await test_storage
    .load({
      key: 'Test Cards',
      id: 1000,
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });

  expect(data).toEqual(temp);
});
