//__unit( "RSA.sample1.html" );
__uses( "BigInteger.init1.js" );
__uses( "BigInteger.init2.js" );
__uses( "RSA.init1.js" );
__uses( "RSA.init2.js" );
__uses( "RSA.init3.js" );
__uses( "RSAKeyFormat.js" );
__uses( "packages.js" );
__uses( "RSAMessageFormat.js" );
__uses( "RSAMessageFormatSOAEP.js" );
__uses( "RSAMessageFormatBitPadding.js" );

// import
var BigInteger = __import( this,"titaniumcore.crypto.BigInteger" );
var RSA = __import( this,"titaniumcore.crypto.RSA" );
var RSAKeyFormat = __import( packageRoot, "titaniumcore.crypto.RSAKeyFormat" );
var RSAMessageFormatSOAEP = __import( this, "titaniumcore.crypto.RSAMessageFormatSOAEP" );
var RSAMessageFormatBitPadding = __import( this, "titaniumcore.crypto.RSAMessageFormatBitPadding" );

RSA.installKeyFormat( RSAKeyFormat );
RSA.installMessageFormat( RSAMessageFormatSOAEP );


