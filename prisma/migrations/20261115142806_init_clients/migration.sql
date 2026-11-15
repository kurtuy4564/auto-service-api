-- DropIndex
DROP INDEX "idx_orders_active_scheduled";

-- CreateIndex
CREATE INDEX "idx_orders_active_scheduled" ON "orders"("status", "scheduled_at") WHERE (status IN ('new', 'in_progress'));
