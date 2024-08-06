#!/usr/bin/env node

require('dotenv').config({ path: ['.env.local', '.env'] });
require('./helper').execute();
