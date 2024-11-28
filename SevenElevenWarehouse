-- Create Database
CREATE DATABASE SevenElevenWarehouse;
GO

USE SevenElevenWarehouse;
GO

-- Create Tables
-- 1. Products Table
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100) NOT NULL,
    Category NVARCHAR(50),
    UnitPrice DECIMAL(10, 2) NOT NULL,
    ReorderLevel INT,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- 2. Suppliers Table
CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY IDENTITY(1,1),
    SupplierName NVARCHAR(100) NOT NULL,
    ContactName NVARCHAR(100),
    Phone NVARCHAR(15),
    Address NVARCHAR(255),
    Email NVARCHAR(100),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- 3. Warehouses Table
CREATE TABLE Warehouses (
    WarehouseID INT PRIMARY KEY IDENTITY(1,1),
    WarehouseName NVARCHAR(100) NOT NULL,
    Location NVARCHAR(255),
    Capacity INT,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- 4. Inventory Table
CREATE TABLE Inventory (
    InventoryID INT PRIMARY KEY IDENTITY(1,1),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    WarehouseID INT FOREIGN KEY REFERENCES Warehouses(WarehouseID),
    Quantity INT NOT NULL,
    LastUpdated DATETIME DEFAULT GETDATE()
);

-- 5. Orders Table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    SupplierID INT FOREIGN KEY REFERENCES Suppliers(SupplierID),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    Quantity INT NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    DeliveryDate DATETIME
);

-- Insert Sample Data
-- Products
INSERT INTO Products (ProductName, Category, UnitPrice, ReorderLevel)
VALUES 
('Milk', 'Dairy', 20.50, 50),
('Bread', 'Bakery', 15.00, 30),
('Coke', 'Beverage', 10.00, 100),
('Chips', 'Snacks', 25.00, 20);

-- Suppliers
INSERT INTO Suppliers (SupplierName, ContactName, Phone, Address, Email)
VALUES 
('Dairy Co.', 'John Doe', '123-456-7890', '123 Milk Street', 'contact@dairyco.com'),
('Bakery Supply Ltd.', 'Jane Smith', '987-654-3210', '45 Bread Avenue', 'info@bakerysupply.com');

-- Warehouses
INSERT INTO Warehouses (WarehouseName, Location, Capacity)
VALUES 
('Central Warehouse', 'Bangkok, Thailand', 1000),
('Eastern Warehouse', 'Chonburi, Thailand', 500);

-- Inventory
INSERT INTO Inventory (ProductID, WarehouseID, Quantity)
VALUES 
(1, 1, 200), -- Milk in Central Warehouse
(2, 1, 150), -- Bread in Central Warehouse
(3, 2, 300), -- Coke in Eastern Warehouse
(4, 2, 100); -- Chips in Eastern Warehouse

-- Orders
INSERT INTO Orders (SupplierID, ProductID, Quantity, DeliveryDate)
VALUES 
(1, 1, 100, '2024-12-01'), -- Milk order from Dairy Co.
(2, 2, 50, '2024-12-02');  -- Bread order from Bakery Supply
