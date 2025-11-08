#!/bin/bash

# Migration script for adding spouse support
# This script will guide you through the migration process

echo "🦓 Chikwape Family Tree - Spouse Migration Script"
echo "=================================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found"
    echo "Please create a .env file with DATABASE_URL and DIRECT_URL"
    exit 1
fi

echo "✅ Found .env file"
echo ""

# Check if Prisma is installed
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx not found"
    echo "Please install Node.js and npm"
    exit 1
fi

echo "✅ npx is available"
echo ""

# Ask user which method to use
echo "Choose migration method:"
echo "1) Prisma (Recommended)"
echo "2) Supabase CLI"
echo "3) Manual SQL"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📦 Running Prisma migration..."
        echo ""
        
        # Create migration
        npx prisma migrate dev --name add_spouse_support
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Migration successful!"
            echo ""
            echo "🔄 Generating Prisma Client..."
            npx prisma generate
            
            if [ $? -eq 0 ]; then
                echo ""
                echo "✅ Prisma Client generated successfully!"
                echo ""
                echo "🎉 Migration complete! You can now use spouse features."
                echo ""
                echo "Next steps:"
                echo "1. Restart your development server"
                echo "2. Check the UI to see spouse support"
                echo "3. Review SPOUSE_FEATURE_README.md for usage examples"
            else
                echo "❌ Failed to generate Prisma Client"
                exit 1
            fi
        else
            echo "❌ Migration failed"
            echo "Check the error messages above"
            exit 1
        fi
        ;;
        
    2)
        echo ""
        echo "📦 Running Supabase migration..."
        echo ""
        
        if ! command -v supabase &> /dev/null; then
            echo "❌ Error: Supabase CLI not found"
            echo "Install it with: npm install -g supabase"
            exit 1
        fi
        
        supabase db push
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Supabase migration successful!"
            echo ""
            echo "🔄 Generating Prisma Client..."
            npx prisma generate
            echo ""
            echo "🎉 Migration complete!"
        else
            echo "❌ Supabase migration failed"
            exit 1
        fi
        ;;
        
    3)
        echo ""
        echo "📄 Manual SQL Migration"
        echo ""
        echo "Please run the following SQL file in your database:"
        echo "  supabase/migrations/20241107000000_add_spouse_table.sql"
        echo ""
        echo "After running the SQL, execute:"
        echo "  npx prisma db pull"
        echo "  npx prisma generate"
        echo ""
        ;;
        
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "📚 Documentation:"
echo "  - Migration Guide: MIGRATION_GUIDE.md"
echo "  - Feature Guide: SPOUSE_FEATURE_README.md"
echo "  - Examples: examples/family-data-with-spouses.example.ts"
echo ""
