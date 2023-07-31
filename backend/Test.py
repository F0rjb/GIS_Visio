# -*- coding: utf-8 -*-
"""
Created on Sun Jul 30 11:06:03 2023

@author: F0rjb
"""
import geopandas as gpd

buildings = gpd.read_file(r'C:/Users/ahmed/Downloads/Technical test/data/buildings_points.geojson')

sample_raster = gpd.read_file(r"C:/Users/ahmed/Downloads/Technical test/data/sample_raster.tif")


buildings.plot()

