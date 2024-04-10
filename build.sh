#!/bin/sh
cd display && npm run build && cd ..
cd guest && npm run build && mv build/ ../build/guest && cd ..
cd host && npm run build && mv build/ ../build/host && cd ..
cd speaker && npm run build && mv build/ ../build/speaker && cd ..