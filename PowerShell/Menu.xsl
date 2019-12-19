<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- <!DOCTYPE html> -->
  <xsl:output method="html" encoding="UTF-8" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed&amp;display=swap" rel="stylesheet"/>
        <link href="../Menu.css" rel="stylesheet"/>
      </head>
      <body>
        <div class="notTree">
          <div class="notRoot">
            <input type="search" placeholder="Search..." id="Search"/>
          </div>
          <div class="notBranch" id="Menu">
            <xsl:for-each select="menu">
              <xsl:apply-templates select="menu"/>
            </xsl:for-each>
          </div>
        </div>
        <script src="../Menu.js"></script>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="menu">
    <div class="Tree">
      <div class="Root">
        <xsl:choose>
          <xsl:when test="@link">
            <xsl:element name="a">
              <xsl:attribute name="href">
                <xsl:value-of select="@link"/>.html</xsl:attribute>
              <xsl:attribute name="target">Article</xsl:attribute>
              <xsl:value-of select="@empty"/>
            </xsl:element>
          </xsl:when>
        </xsl:choose>
        <xsl:element name="span">
          <xsl:value-of select="@title"/>
        </xsl:element>
      </div>
      <div class="Branch">
        <xsl:apply-templates/>
      </div>
    </div>
  </xsl:template>

</xsl:stylesheet>
