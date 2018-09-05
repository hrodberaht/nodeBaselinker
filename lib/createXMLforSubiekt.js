const creataDataToWriteToXMLFile = function creataDataToWriteToXMLFile(data) {

    const fs = require("fs");
    let startOfXML;
    let midleOfXML;
    let endOfXML;

    startOfXML = `<?xml version="1.0" encoding="windows-1250"?>
        <?xml-stylesheet type="text/xsl" href=""?>
        <Batch xmlns="urn:schemas-basda-org:BatchEnvelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Date="2017-07-03" Number="1" SupplierName="" DocType="Order">

            <Order xmlns="urn:schemas-basda-org:2000:purchaseOrder:xdr:3.01"><OrderHead xmlns="">
                <Schema><Version>3</Version></Schema>
                <Parameters>
                    <Language>PL</Language>
                    <DecimalSeparator>,</DecimalSeparator>
                    <Precision>20.3</Precision>
                </Parameters>
                <OrderType Code="PUO">Zamówienie</OrderType>
                <Function Code="FIO"/>
                <OrderCurrency>
                    <Currency Code="PLN"/>
                </OrderCurrency>
                <Checksum>73327</Checksum>
                </OrderHead>
                <OrderReferences xmlns="">
                    <BuyersOrderNumber>17235853</BuyersOrderNumber>
                </OrderReferences>
                <OrderDate xmlns="">2018-01-01</OrderDate>
                <Supplier xmlns="">
                    <SupplierReferences>
                        <BuyersCodeForSupplier></BuyersCodeForSupplier>
                    <TaxNumber></TaxNumber>
                    </SupplierReferences>
                    <Party></Party>
                    <Address>
                        <Street></Street>
                        <City></City>
                        <PostCode></PostCode>
                    </Address>
                    <Contact>
                        <Name></Name>
                        <Fax></Fax>
                    </Contact>
                </Supplier>

                <Buyer xmlns="">
                    <BuyerReferences>
                        <SuppliersCodeForBuyer>Ewa Wojtas</SuppliersCodeForBuyer>
                        <TaxNumber></TaxNumber>
                    </BuyerReferences>
                    <Party>Ewa Wojtas</Party>
                    <Address>
                        <Street>Kraszewskiego 12/4</Street>
                        <City>Bochnia</City>
                        <PostCode>32-700</PostCode>
                    </Address>
                    <Contact>
                        <Name>Ewa Wojtas</Name>
                    </Contact>
                </Buyer>`

    endOfXML = `</Order>
        <BatchTrailer xmlns="">
            <ItemCurrency><Currency Code="PLN"/></ItemCurrency>
            <Checksum/>
        </BatchTrailer>
        </Batch>`;

    const createData = function creataMidleofXML(data) {
        let dataToWrite;
        data.forEach(product => {
            dataToWrite +=
                `<OrderLine xmlns="">
                <LineNumber>45680943</LineNumber>
                            <Product>
                                <SuppliersProductCode>${product.ean}</SuppliersProductCode>
                                <Description>${product.name}</Description>
                            </Product>
                            <Quantity UOMCode="szt.">
                                <Amount>${product.quantity}</Amount>
                            </Quantity>
                            <Price>
                                <UnitPrice></UnitPrice>
                            </Price>
                            <PercentDiscount>
                                <Type Code="LID"/>
                                <Percentage>0</Percentage>
                            </PercentDiscount>
                            <LineTax>
                                <TaxRate Code="H">${product.vat}</TaxRate>
                                <TaxValue></TaxValue>
                            </LineTax>
                            <LineTotal>${product.totalPrice}</LineTotal>
                            <OrderLineInformation></OrderLineInformation>
                </OrderLine>
                `
        });
        return dataToWrite;
    }
    midleOfXML = createData(data);

    const fd = dataToWrite = startOfXML + midleOfXML + endOfXML;

    fs.writeFile("orders.txt", fd, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}
module.exports = creataDataToWriteToXMLFile;

